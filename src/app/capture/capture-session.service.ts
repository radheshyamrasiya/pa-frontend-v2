import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { DevoteeMin, Devotee, DevoteeMinPage } from '../model/devotee.model';
import { Paging } from '../model/paging.model';
import { HttpService } from '../shared/http.service';
import { connectionProperties, statusType, dbRequestPageSize } from '../shared/app-properties';
import { StatusService } from '../shared/status.service';


@Injectable()

/*
Name: FollowupSessionService
Purpose: Since followup task spreads across many screens, the data of one screen
is needed in other screens. This service helps in maintaining the session of followup
*/

export class CaptureSessionService {
    pageNumber: number;
    
    constructor(
        private httpService: HttpService,
        private statusService: StatusService,
    ) {}

    init() {
        this.pageNumber=0;
        //this.loadCaptureDevoteeList();
    }

    loadCaptureDevoteeList(devoteeId: number, page: number): Observable<DevoteeMinPage> {
        //Get the volunteer id from Login Session Service and fetch followup list
        //assigned to the volunteer. We have hardcoded the devotee list now
        let params = "?page=" + page + "&size=" + dbRequestPageSize  + "&sort=introDate,desc";
        this.pageNumber = page;
        return Observable.create(observer => {
            this.httpService
            .get(connectionProperties.myCapturedListUrl + "/" + devoteeId + params)
            .subscribe(res => {
                let contents = new DevoteeMinPage();
                let devoteeList = JSON.parse(res._body);
                contents.devoteeList = devoteeList.data;
                contents.paging = devoteeList.paging;
                observer.next(contents);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error retriving devotee details", statusType.error);
                observer.complete();
            });
        });
    }
}