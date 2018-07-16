import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { routeConstants, statusType, connectionProperties, callResponse } from '../shared/app-properties';
import { HttpService } from "../shared/http.service";
import { LoginSessionService } from '../login/login-session.service';

import { Devotee } from '../model/devotee.model';
import { Followup } from '../model/followup.model';
import { History } from '../model/history.model';
import { StatusService } from '../shared/status.service';

@Component ({
    selector: 'call-response',
    templateUrl: './call-response.component.html',
})

export class CallResponseComponent implements OnInit {
    displayAttendee: Devotee;
    taskCompletionIndex: number;
    followup: Followup;
    callResponse;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private httpService: HttpService,
        private loginSession: LoginSessionService, 
        private statusService: StatusService,
    ) {};

    ngOnInit() {
        this.displayAttendee = new Devotee();
        this.callResponse = callResponse;
        this.followup = new Followup;
        this.followup.rating = 0;
        this.taskCompletionIndex = 0;
        this.followup.volunteerId = this.loginSession.devoteeId;

        this.followup.response = callResponse.callAgain;

        this.activatedRoute.params.subscribe((params: Params) => { 
            this.followup.attendeeId = +params[routeConstants.paramDevoteeId]; 
            this.followup.programId = +params[routeConstants.paramsProgramId];
            
            this.fetchAttendee(this.followup.attendeeId);
            this.fetchOrCreateFollowupRecord();
        });
    }

    fetchAttendee(attendeeId: number) {
        this.httpService.getData(connectionProperties.devotees, 
            '/' + attendeeId
        ).subscribe(devotee => {
            this.displayAttendee = devotee as Devotee;
        }, err => {
            //Handle Error
        })
    }

    fetchOrCreateFollowupRecord() {
        this.httpService.getData(connectionProperties.getSpecificFollowupRecord,
            '/' + this.followup.programId +
            '/' + this.followup.attendeeId + 
            '/' + this.followup.volunteerId
        ).subscribe(followupRecord => {
            console.log(followupRecord);
            this.followup = followupRecord as Followup;
            this.taskCompletionIndex = this.followup.taskStatus/20;
        }, err => {
            //Handle Error 
        });
    }

    onCompletionClick() {
        this.followup.taskStatus = this.taskCompletionIndex * 20;
    }

    onSaveClick() {
        // if(this.followup.rating == 0) {
        //     this.statusService.error("Kindly rate the devotee!");
        //     return;
        // }
        this.followup.timestamp = Date.now();
        //Update History too
        let history = new History();
        history.comment = "[Followed up for " + this.followup.programName  + ", Responded as:" + this.followup.response+ "] " + this.followup.comment;
        history.commentedByDevoteeId = this.followup.volunteerId;
        history.ratedDevoteeId = this.followup.attendeeId;
        history.rating = this.followup.rating;
        history.response = this.followup.response;
        history.timeStamp = this.followup.timestamp;
        this.httpService.putAndReturnData(connectionProperties.updateFollowupRecord + '/' + this.followup.id, '', this.followup)
        .subscribe(follwup => {
            //created a new followup record
        }, err => {
            //handle error of creating new followup record
        });
        this.httpService.postAndReturnData(connectionProperties.writeHistory, '', history)
        .subscribe(history => {
            //Check the object if needed
        }, err => {
            this.statusService.error("Error updating history");
        });
        //Go Back
        this.onBackClick();
    }

    onBackClick() {
        let programId: number;
        this.activatedRoute.params.subscribe(params => {
            programId = +params[routeConstants.paramsProgramId];
            if(this.router.routerState.snapshot.url.startsWith(routeConstants.followup,1)) {
                this.router.navigate(['../../../', routeConstants.followupProgram, programId], {relativeTo: this.activatedRoute, queryParams: {id: this.displayAttendee.id} });    
            }    
        });
    }
}