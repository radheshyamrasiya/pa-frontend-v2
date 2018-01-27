import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Devotee } from '../model/devotee.model';
import { LoginSessionService } from '../login/login-session.service';
import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';
import { statusType, connectionProperties } from '../shared/app-properties';

@Component ({
    selector: "capture-contact",
    templateUrl: "./capture-contact.component.html",
})

export class CaptureContactComponent implements OnInit {
    devotee: Devotee;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private httpService: HttpService,
        private loginService: LoginSessionService,
        private statusService: StatusService,
    ) {}

    ngOnInit() {
        this.devotee = new Devotee();
    }
    
    onCaptureClick(): void {
        if (this.validateDevotee()) {
            this.devotee.capturedBy = this.loginService.getDevoteeId();
            this.httpService.postAndReturnData(connectionProperties.capture, "", this.devotee)
            .subscribe(contents => {
                this.devotee = new Devotee();
            }, err =>{
                //TODO: Handle Error
            });
        }
    }

    validateDevotee(): boolean {
        if (this.devotee.legalName == undefined || this.devotee.legalName == ""){
            this.statusService.setFlag("Enter a name", statusType.error);
            return false;
        }
        if (this.devotee.smsPhone == undefined || this.devotee.smsPhone == "") {
            this.statusService.setFlag("Enter phone number", statusType.error);
            return false;
        }
        return true;
    }

    onBackClick() {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
}