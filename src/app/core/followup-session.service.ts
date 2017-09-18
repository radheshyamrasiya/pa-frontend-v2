import { Injectable } from '@angular/core';

import { Devotee } from '../model/devotee.model';
import { HttpService } from '../shared/http.service';
import { connectionProperties } from '../shared/app-properties';


@Injectable()

/*
Name: FollowupSessionService
Purpose: Since followup task spreads across many screens, the data of one screen
is needed in other screens. This service helps in maintaining the session of followup
*/

export class FollowupSessionService {
    //Change followupDevoteeList to program, devotee array
    followupDevoteeList: Devotee[];
    currentFollowupDevoteeId: number;

    constructor(private httpService: HttpService) {}

    init() {
        this.loadFollowupDevoteeList();
    }

    loadFollowupDevoteeList() {
        //Get the volunteer id from Login Session Service and fetch followup list
        //assigned to the volunteer. We have hardcoded the devotee list now
        this.httpService
        .get(connectionProperties.followUpDevoteeList)
        .subscribe(res => {
            console.log(res._body);
            let devoteeList = JSON.parse(res._body);
            this.followupDevoteeList = devoteeList.data;
            console.log(this.followupDevoteeList);
        }, err => {
            console.log(err);
        });
    }

    getCurrentFollowupDevotee(): Devotee {
        return this.followupDevoteeList.find(x => x.id == this.currentFollowupDevoteeId);
    }

    setCurrentFollowupDevotee(devoteeId: number): void {
        this.currentFollowupDevoteeId = devoteeId;
    }
}