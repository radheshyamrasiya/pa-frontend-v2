import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { statusType, routeConstants, connectionProperties } from '../shared/app-properties';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';
import { EnumService } from '../shared/enum.service';
import { LoginSessionService } from '../login/login-session.service';
import { Devotee } from '../model/devotee.model';
import { Login } from '../model/login.model';

@Component({
    selector: 'manage-user-account',
    templateUrl: 'manage-user-account.component.html'
})

export class ManageUserAccountComponent implements OnInit {
    selectedDevotee: Devotee;
    selectedDevoteeUserAccount: Login;
    createErrorMsg: string;
    availableRoles: [string];
    accountEmail: string;
    selectedRole : string;
    userAccountRespData: Login;
    resetPasswordRespData: Login;
    resetErrorMsg :string;

    constructor(
        //private modalService: NgbModal,
        private httpService: HttpService,
        private statusService: StatusService,
        //private router: Router,
        //private activatedRoute: ActivatedRoute,
        public enumService: EnumService,
        public loginService: LoginSessionService,
    ) { }

    ngOnInit() {
        this.resetVals();
        const totalRoles = this.enumService.enums.type.typeDesc;
        // selecting only those roles which are below my role
        // this is based on the assumption that the roles are
        // in ascending order of privileges
        const myRole = this.loginService.role;
        this.availableRoles = totalRoles.slice(0, totalRoles.indexOf(myRole));
    }

    /**
     * Reset the vals which depend on later server calls
     */
    resetVals() {
        this.userAccountRespData = null;
        this.accountEmail = null;
        this.selectedRole = null;
        this.createErrorMsg = null;
        this.resetPasswordRespData = null;
        this.resetErrorMsg = null;
        this.selectedDevoteeUserAccount = null;
    }

    onDevoteeSelectClick(devoteeId: number) {
        this.httpService.getData(`${connectionProperties.devotees}/${devoteeId}`)
            .subscribe((devotee) => {
                this.selectedDevotee = devotee as Devotee;
                this.resetVals();
                this.accountEmail = this.selectedDevotee.email;

                if (this.selectedDevotee.userAccountId) {
                    const userAccountId = this.selectedDevotee.userAccountId;
                    this.httpService.getData(`${connectionProperties.getUserAccount}/${userAccountId}`, '')
                        .subscribe((respData) => {
                            this.selectedDevoteeUserAccount = respData as Login;
                        }, (err) => {
                            // do nothing
                        })
                }
            }, (err) => {
                    this.statusService.error("Unable to fetch devotee details");
            })
    }

    onCreateNewAccountClick() {
        if (!this.accountEmail) {
            this.createErrorMsg = "Please enter a valid email address";
            return;
        }
        if (!this.selectedRole) {
            this.createErrorMsg = "Please select a role";
            return;
        }

        const userAccountReqData = {
            devoteeId: this.selectedDevotee.id,
            email: this.accountEmail,
            type: this.selectedRole
        };
        this.httpService.postAndReturnData(`${connectionProperties.createUserAccount}/`, '', userAccountReqData)
            .subscribe((respData) => {
                this.userAccountRespData = respData as Login;
            }, (err) => {
                console.log(err);
                if (err.status === 400) {
                    this.createErrorMsg = 'User account already exists for devotee';
                }
            });
    }

    onResetPasswordClick() {
        const userAccountId = this.selectedDevotee.userAccountId;
        this.httpService.putAndReturnData(`${connectionProperties.resetPassword}/${userAccountId}`, '', {})
            .subscribe((respData) => {
                this.resetPasswordRespData = respData as Login;
            }, (err) => {
                this.resetErrorMsg = 'Unable to reset password for given devotee';
            });
    }
}
