import { Injectable } from '@angular/core';

import { DevoteeMin } from '../model/devotee.model';
import { HttpService } from '../shared/http.service';
import { connectionProperties } from '../shared/app-properties';

import { CapturePostQueryModel } from '../model-get/capture-post-query.model';


@Injectable()

/*
Name: FollowupSessionService
Purpose: Since followup task spreads across many screens, the data of one screen
is needed in other screens. This service helps in maintaining the session of followup
*/

export class CaptureSessionService {
    //Change followupDevoteeList to program, devotee array
    loggedInDevoteeId: number;
    captureDevoteeList: DevoteeMin[];
    captureDevoteeListBackUrl: string;
    captureDevoteeListFrontUrl: string;
    currentCaptureDevoteeId: number;

    constructor(
        private httpService: HttpService,
    ) {}

    init() {
        //this.loadCaptureDevoteeList();
    }

    loadCaptureDevoteeList(devoteeId: number) {
        this.loggedInDevoteeId = devoteeId;
        console.log("Who is logging in : " + this.loggedInDevoteeId + " : " + devoteeId);
        //Get the volunteer id from Login Session Service and fetch followup list
        //assigned to the volunteer. We have hardcoded the devotee list now
        this.httpService
        .get(connectionProperties.followUpDevoteeList)
        .subscribe(res => {
            console.log(res._body);
            let devoteeList = JSON.parse(res._body);
            this.captureDevoteeList = devoteeList.data;
            console.log(this.captureDevoteeList);
            this.captureDevoteeListBackUrl = "";
            this.captureDevoteeListFrontUrl = "";
        }, err => {
            console.log(err);
        });
    }

    addCapturedDevotee(devotee: DevoteeMin) {
        let postRequest = new CapturePostQueryModel();
        
        postRequest.legalName = devotee.name;
        postRequest.smsPhone = devotee.phone;
        postRequest.area = devotee.area;
        postRequest.address = devotee.pin;
        postRequest.capturedBy = this.loggedInDevoteeId;
        console.log("devotee capturing is : " + postRequest.capturedBy + " : " + this.loggedInDevoteeId);

        this.httpService
        .post(connectionProperties.capture, postRequest)
        .subscribe(res => {
            console.log(res._body);
            let devoteeList = JSON.parse(res._body);
            this.captureDevoteeList = devoteeList.data;
            console.log(this.captureDevoteeList);
            this.captureDevoteeListBackUrl = "";
            this.captureDevoteeListFrontUrl = "";
        }, err => {
            console.log(err);
        });
    }

    loadCaptureDevoteeListBack() {
        //Write code to fetch the devotees list if back button is pressed
        this.captureDevoteeListBackUrl = ""; //Use this url
    }

    loadCaptureDevoteeListFront() {
        //Write code to fetch the devotees list if back button is pressed
        this.captureDevoteeListFrontUrl = "" //Use this url
    }

    getCurrentCaptureDevotee(): DevoteeMin {
        return this.captureDevoteeList.find(x => x.id == this.currentCaptureDevoteeId);
    }

    setCurrentCaptureDevotee(devoteeId: number): void {
        this.currentCaptureDevoteeId = devoteeId;
    }
}