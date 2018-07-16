import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Devotee } from '../model/devotee.model';
import { History } from '../model/history.model';
import { FollowupVolunteerPage } from '../model/followup-volunteer.model';
import { ProgramAssignment } from '../model/program-assignment.model';
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
    devotee: Devotee;
    volunteeringPrograms: FollowupVolunteerPage;
    programAssignment: ProgramAssignment;
    captureHistory: History;
    capturedAt: string;
    toggleAdditionalDetails: boolean;

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
        let programId = undefined;
        let programName = "None";
        if (this.programAssignment != undefined) {
            programId = this.programAssignment.programId;
            programName = this.programAssignment.programName;
        }
        this.devotee = new Devotee();

        this.programAssignment = new ProgramAssignment();

        this.captureHistory = new History();
        this.captureHistory.commentedByDevoteeId = this.loginService.devoteeId;
        this.captureHistory.rating = 0;

        this.toggleAdditionalDetails = false;

        this.programAssignment.programId = programId;
        this.programAssignment.programName = programName;
    }
    
    onCaptureClick(): void {
        if (this.validateDevotee()) {
            this.devotee.capturedBy = this.loginService.getDevoteeId();
            this.httpService.postAndReturnData(connectionProperties.capture, "", this.devotee)
            .subscribe(contents => {
                let devoteeObj = contents as Devotee;
                this.signUpForProgram(devoteeObj.id);
                this.createHistoryEntry(devoteeObj.id);
                this.initialiseForNewCapture();
            }, err =>{
                //TODO: Handle Error 
            });
        }
    }

    validateDevotee(): boolean {
        if (this.devotee.legalName == undefined || this.devotee.legalName == ""){
            this.statusService.error("Enter a name");
            return false;
        }
        if (this.devotee.smsPhone == undefined || this.devotee.smsPhone == "") {
            this.statusService.error("Enter phone number");
            return false;
        }
        return true;
    }

    signUpForProgram(participantId: number) {

        this.programAssignment.attendeeId = participantId;
        this.httpService.post(connectionProperties.createProgramAssignment,this.programAssignment)
        .subscribe(history => {
            //Do something if success
        }, err => {
            //Do something if failure
        })
    }

    createHistoryEntry(devoteeId: number) {
        if (this.captureHistory.comment == "") {
            this.captureHistory.comment = "[Captured without Comment]";
        } else {
            this.captureHistory.comment = "[Captured @: " + this.capturedAt + "] " + this.captureHistory.comment;
        }
        this.captureHistory.ratedDevoteeId = devoteeId;
        
        this.httpService.post(connectionProperties.writeHistory,this.captureHistory)
        .subscribe(history => {
            //Do something if success
        }, err => {
            //Do something if failure
        })
    }

    onCheckDevoteeClick() {
        this.httpService.getData(connectionProperties.devoteesByPhone + "/" + this.devotee.smsPhone)
        .subscribe(devoteeObj => {
            this.devotee = devoteeObj as Devotee;
        }, err => {
            let phone = this.devotee.smsPhone;
            this.initialiseForNewCapture();
            this.devotee.smsPhone = phone;
        });
    }

    onBackClick() {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
}