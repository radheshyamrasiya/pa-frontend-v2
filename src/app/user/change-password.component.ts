import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSessionService } from '../login/login-session.service';
import { StatusService } from '../shared/status.service';
import { HttpService } from '../shared/http.service';
import { connectionProperties } from '../shared/app-properties';


@Component({
    selector: 'change-password',
    templateUrl: 'change-password.component.html'
})

export class ChangePasswordComponent implements OnInit {
    name: string;
    existingPassword: string;
    newPassword_1: string;
    newPassword_2: string;
    errorMsg: string;

    constructor(
        private loginService: LoginSessionService,
        private router: Router,
        private httpService: HttpService,
        private statusService: StatusService
    ) { }

    ngOnInit() {
        this.name = this.loginService.devoteeName
    }

    onSubmitClick() {
        this.errorMsg = '';
        if (this.newPassword_1 !== this.newPassword_2) {
            this.errorMsg = "New passwords don't match, please check";
            return;
        } else {
            const changePasswordData = {
                oldPassword: this.existingPassword,
                newPassword: this.newPassword_1
            }
            this.httpService.putAndReturnData(`${connectionProperties.changePassword}/${this.loginService.devoteeId}`, '', changePasswordData)
                .subscribe((responseData) => {
                    this.statusService.success('Successfully changed password, please log in again');
                    this.loginService.logout();
                }, (err) => {
                    if (err.status === 403) {
                        this.statusService.error('Wrong password entered, please enter correct password');
                        this.errorMsg = 'Entered password is wrong, please enter the correct one';
                    }
                })
        }
    }

    onBackClick() {
        this.router.navigate(['../../']);
    }
}
