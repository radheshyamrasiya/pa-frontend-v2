import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Devotee } from '../model/devotee.model';
import { CaptureContactRequest } from '../model/capture-contact.model';
import { FollowupVolunteerPage } from '../model/followup-volunteer.model';
import { LoginSessionService } from '../login/login-session.service';
import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';
import { statusType, connectionProperties } from '../shared/app-properties';
import { Paging } from "../model/entity.model";

@Component ({
    selector: "capture-contact",
    templateUrl: "./capture-contact.component.html",
})

export class CaptureContactComponent implements OnInit {
    programName: string;
    captureContactRequest: CaptureContactRequest;
    volunteeringPrograms: FollowupVolunteerPage;
    toggleAdditionalDetails: boolean;

    recordNotExist = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private httpService: HttpService,
        private loginService: LoginSessionService,
        private statusService: StatusService,
    ) {}

    ngOnInit() {
        this.initialiseForNewCapture();
        
        this.volunteeringPrograms = new FollowupVolunteerPage;
        this.volunteeringPrograms.dataList = [];
        this.volunteeringPrograms.paging = new Paging();

        this.httpService.getList(connectionProperties.listProgramsByVolunteer 
            + '/' + this.loginService.devoteeId
        ).subscribe(volunteeringList => {
            this.volunteeringPrograms = volunteeringList as FollowupVolunteerPage;
        });
    }

    initialiseForNewCapture() {
        this.programName = "None";
        
        this.captureContactRequest = new CaptureContactRequest();
        this.captureContactRequest.programInterestedIn = undefined;
        this.captureContactRequest.capturedDevotee = new Devotee();
        this.captureContactRequest.rating = 0;

        this.toggleAdditionalDetails = false;
    }
    
    onCaptureClick(): void {
        if (this.validateDevotee()) {
            // clone object
            let capturedDevotee = new Devotee();
            capturedDevotee = Object.assign(capturedDevotee, this.captureContactRequest.capturedDevotee);
            let captureContactReqClone = new CaptureContactRequest();
            captureContactReqClone = Object.assign(captureContactReqClone, this.captureContactRequest);
            captureContactReqClone.capturedDevotee = capturedDevotee;

            // this.captureContactRequest.capturedById = this.loginService.getDevoteeId();
            captureContactReqClone.capturedById = this.loginService.getDevoteeId();
            this.initialiseForNewCapture();
            this.statusService.info(`Saving details for ${capturedDevotee.legalName}. In the meantime, you can update another contact.`);
            this.httpService.postAndReturnData(connectionProperties.capture, "", captureContactReqClone)
            .subscribe(contents => {
                let devoteeObj = contents as Devotee;
                this.statusService.success(`Successfully updated details for ${devoteeObj.legalName}`);
            }, err =>{
                //TODO: Handle Error 
                this.statusService.error(`Error in saving ${captureContactReqClone.capturedDevotee.legalName}`);
            });
        }
    }

    validateDevotee(): boolean {
        if (this.captureContactRequest.capturedDevotee.legalName == undefined || this.captureContactRequest.capturedDevotee.legalName == ""){
            this.statusService.error("Enter a name");
            return false;
        }
        if (this.captureContactRequest.capturedDevotee.smsPhone == undefined || this.captureContactRequest.capturedDevotee.smsPhone == "") {
            this.statusService.error("Enter phone number");
            return false;
        }
        
        return true;
    }

    onCheckDevoteeClick() {
        this.httpService.getData(connectionProperties.devoteesByPhone + "/" + this.captureContactRequest.capturedDevotee.smsPhone)
        .subscribe(devoteeObj => {
            this.captureContactRequest.capturedDevotee = devoteeObj as Devotee;
        }, err => {
            let phone = this.captureContactRequest.capturedDevotee.smsPhone;
            this.initialiseForNewCapture();
            this.captureContactRequest.capturedDevotee.smsPhone = phone;
            this.recordNotExist = true;
            setTimeout(() => this.recordNotExist = false, 3000);
            //Create New!
        });
    }

    onBackClick() {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
}
