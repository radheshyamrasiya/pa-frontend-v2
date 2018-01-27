import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { Devotee } from '../model/devotee.model';
import { Yatra } from '../model/yatra.model';

import { statusType, routeConstants, connectionProperties } from '../shared/app-properties';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';
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
        private httpService: HttpService,
        private statusService: StatusService,
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
                this.httpService.getData(connectionProperties.getYatra, "/" + yatraId)
                .subscribe(yatra => {
                    this.isCreate = false;
                    this.yatra = yatra as Yatra;
                    this.httpService.getData(connectionProperties.devotees, "/" + this.yatra.yatraAdmin)
                    .subscribe(devotee => {
                        this.devotee = devotee as Devotee;
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
                this.httpService.getData(connectionProperties.devoteesByEmailId, {
                    queryParams: {email: this.emailAddress}
                })
                .subscribe((devotee) => {
                    if (devotee == null) {
                        this.statusService.error("Devotee not found!");
                    } else {
                        this.devotee = devotee as Devotee;
                        this.yatra.yatraAdmin = (<Devotee>devotee).id;
                    }
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
        this.httpService.postAndReturnData(connectionProperties.createYatra,'',this.yatra)
        .subscribe(responseYatra => {
            //Handle Success
        }, err => {
            //Handle Error
        });
    }

    onUpdateYatraDetailsClick() {
        if (!this.validatePage()) return;
        this.httpService.putAndReturnData(connectionProperties.updateYatra, "/" + this.yatra.id, this.yatra)
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