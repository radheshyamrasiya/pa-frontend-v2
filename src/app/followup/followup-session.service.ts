import { Injectable } from '@angular/core';

import { DevoteeMin } from '../model/devotee.model';
import { FollowupDevotees } from '../model-frontend/follwoup-devotees.model';
import { PreachingProgram } from '../model/preaching-program.model';
import { HttpService } from '../shared/http.service';
import { connectionProperties } from '../shared/app-properties';

import { mockFollowupDevotees } from '../mock-data/mock-data';


@Injectable()

/*
Name: FollowupSessionService
Purpose: Since followup task spreads across many screens, the data of one screen
is needed in other screens. This service helps in maintaining the session of followup
*/

export class FollowupSessionService {
    //Change followupDevoteeList to program, devotee array
    followupList: FollowupDevotees[];
    followupProgramList: PreachingProgram[];
    
    followupDevoteeListBackUrl: string;
    followupDevoteeListFrontUrl: string;

    currentFollowupDevoteeId: number;
    currentFollowupProgramId: number;

    constructor(private httpService: HttpService) {}

    init() {
        this.loadFollowupDevoteeList();
    }

    loadFollowupDevoteeList() {
        this.followupList = [];
        this.followupList.push(new FollowupDevotees);
        this.followupList[0].programId = 1; //Load from DB
        //Get the volunteer id from Login Session Service and fetch followup list
        //assigned to the volunteer. We have hardcoded the devotee list now
        /*
        this.httpService
        .get(connectionProperties.followUpDevoteeList)
        .subscribe(res => {
            console.log(res._body);
            let devoteeList = JSON.parse(res._body);
            this.followupList[0].devoteeList = devoteeList.data;
            console.log(this.followupList[0].devoteeList);
            this.followupDevoteeListBackUrl = "";
            this.followupDevoteeListFrontUrl = "";
        }, err => {
            console.log(err);
        });
        */

        //Overriding Get Request with mock data
        this.followupList = [];
        this.followupList = mockFollowupDevotees;  //Mock Data: Delete Later
        this.followupProgramList = [];

        this.followupList.forEach(element => {
            length = this.followupProgramList.push(new PreachingProgram);
            this.followupProgramList[length-1].id = this.followupList[length-1].programId;
            this.followupProgramList[length-1].name = this.followupList[length-1].programName;
        });
    }

    loadFollowupDevoteeListBack() {
        //Write code to fetch the devotees list if back button is pressed
        this.followupDevoteeListBackUrl = ""; //Use this url
    }

    loadFollowupDevoteeListFront() {
        //Write code to fetch the devotees list if back button is pressed
        this.followupDevoteeListFrontUrl = "" //Use this url
    }

    getDevoteeList(programId: number): DevoteeMin[] {
        if (this.followupList) {
            this.followupList.forEach(x => {
                x.devoteeList.forEach(element => {
                })
            });
            let devoteeList = this.followupList.find(x => x.programId == programId).devoteeList;
            if(devoteeList) {
                return devoteeList;
            }
        }
        return [];
    }

    getProgramList(): PreachingProgram[] {
        if (this.followupProgramList) {
            return this.followupProgramList;
        } else {
            return [];
        }
    }

    getCurrentFollowupDevotee(): DevoteeMin {
        return this.followupList[0].devoteeList.find(x => x.id == this.currentFollowupDevoteeId);
    }

    setCurrentFollowupDevotee(devoteeId: number): void {
        this.currentFollowupDevoteeId = devoteeId;
    }
}