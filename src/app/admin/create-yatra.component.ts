import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { Devotee } from '../model/devotee.model';
import { Yatra } from '../model/yatra.model';

import { statusType, routeConstants } from '../shared/app-properties';

import { DevoteeService } from '../devotee/devotee.service';
import { StatusService } from '../shared/status.service';
import { YatraService } from './yatra.service';
import { EnumService } from '../shared/enum.service';

@Component({
    selector: 'create-yatra',
    templateUrl: 'create-yatra.component.html'
})

export class CreateYatraComponent implements OnInit {
    devotee: Devotee;
    yatra: Yatra;
    emailAddress: string;
    isCreate: boolean; //Toggles the visiblity of register/update buttons

    constructor(
        private modalService: NgbModal,
        private devoteeService: DevoteeService,
        private statusService: StatusService,
        private yatraService: YatraService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private enumService: EnumService,
    ) { }

    ngOnInit() {
        this.isCreate = true;
        this.devotee = new Devotee();
        this.yatra = new Yatra();
        this.activatedRoute.params.subscribe(params => {
            let yatraId = params[routeConstants.paramsYatraId];
            if (yatraId != undefined || yatraId != null) {
                this.yatraService.loadYatra(+yatraId)
                .subscribe(yatra => {
                    this.isCreate = false;
                    this.yatra = yatra;
                    this.devoteeService.loadDevotee(this.yatra.yatraAdmin)
                    .subscribe(devotee => {
                        this.devotee = devotee;
                    }, err => {
                        //
                    })
                }, err => {
                    //
                })
            }
        });
    }

    onSelectYatraAdminClick(content) {
        this.modalService.open(content).result.then((result) => {
            if (result=="fetch") {
                this.devoteeService.getDevoteeByEmailId(this.emailAddress)
                .subscribe((devotee) => {
                    this.yatra.yatraAdmin = devotee.id;
                    this.devotee = devotee;
                }, err => {
                    this.statusService.setFlag("Email not found! Unable to fetch devotee", statusType.error);
                });
            }
        });
    }

    validatePage(): boolean {
        if (this.yatra.yatraName == null || this.yatra.yatraName == "") {
            this.statusService.setFlag("Enter Yatra Name", statusType.error);
            return false;
        }
        if (this.yatra.yatraAddress == null || this.yatra.yatraAddress == "") {
            this.statusService.setFlag("Enter Yatra Address", statusType.error);
            return false;
        }
        if (this.yatra.yatraType == null || this.yatra.yatraType == "") {
            this.statusService.setFlag("Enter Yatra Type", statusType.error);
            return false;
        }
        if (this.yatra.yatraAdmin == null || this.yatra.yatraAdmin == undefined) {
            this.statusService.setFlag("Select a Yatra Admin", statusType.error);
            return false;
        }
        return true
    }

    onRegisterYatraClick() {
        if (!this.validatePage()) return;
        this.yatraService.createYatra(this.yatra)
        .subscribe(responseYatra => {
            //Handle Success
        }, err => {
            //Handle Error
        });
    }

    onUpdateYatraDetailsClick() {
        if (!this.validatePage()) return;
        this.yatraService.updateYatra(this.yatra)
        .subscribe(responseYatra => {
            //Handle Success
        }, err => {
            //Handle Error
        });
    }

    onBackClick() {
        if (this.isCreate)
            this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        else
            this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
}