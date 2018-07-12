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
        public enumService: EnumService,
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
        this.modalService.open(content).result.then((devoteeId: number) => {
            console.log(`Clicked Devotee with id ${devoteeId}`);
            this.httpService.getData(`${connectionProperties.devotees}/${devoteeId}`)
                .subscribe((devotee) => {
                    if (devotee ===  null) {
                        this.statusService.error("Devotee not found");
                    } else {
                        this.devotee = devotee as Devotee;
                        this.yatra.yatraAdmin = this.devotee.id;
                    }
                }, (err) => {
                    this.statusService.setFlag("Unable to fetch devotee", statusType.error);
                })
        }, (err) => {
            console.log(`dismiss called with reason ${err}`);
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
            // Handle success
            const yatraDetails = responseYatra as Yatra;
            this.statusService.success(`Created ${yatraDetails.yatraName} successfully!`);
            this.onBackClick();

        }, err => {
            //Handle Error
            this.statusService.error('There was a problem with registering this yatra, please contact admin');
        });
    }

    onUpdateYatraDetailsClick() {
        if (!this.validatePage()) return;
        this.httpService.putAndReturnData(connectionProperties.updateYatra, "/" + this.yatra.id, this.yatra)
        .subscribe(responseYatra => {
            //Handle Success
            const yatraDetails = responseYatra as Yatra;
            this.statusService.success(`Updated ${yatraDetails.yatraName} successfully!`);
            this.onBackClick();
        }, err => {
            //Handle Error
          this.statusService.error('There was a problem with updating this yatra, please contact admin');
        });
    }

    onBackClick() {
        if (this.isCreate) {
            this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        } else {
            this.router.navigate([routeConstants.superAdmin, routeConstants.listYatra]);
        }
    }
}
