import { Injectable, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { HttpService } from '../shared/http.service';
import { connectionProperties, statusType, dbRequestPageSize } from '../shared/app-properties';
import { StatusService } from '../shared/status.service';

import { FollowupVolunteer, FollowupVolunteerPage } from '../model/followup-volunteer.model';

@Injectable()
export class FollowupVolunteerService implements OnInit {
    pageNumber: number;

    constructor(
        private statusService: StatusService,
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        this.pageNumber = 0;
    }

    loadFollowupVolunteerList(programId: number, page: number): Observable<FollowupVolunteerPage> {      
        let followupVolunteerPage = new FollowupVolunteerPage();
        let params = "?page=" + page + "&size=" + dbRequestPageSize;
        return Observable.create(observer => {
            this.httpService
            .get(connectionProperties.listFollowupVolunteer + '/' + programId + params)
            .subscribe(response => {
                let responseFollowupVolunteer = JSON.parse(response._body);
                followupVolunteerPage.followupVolunteerList = responseFollowupVolunteer.data;
                followupVolunteerPage.paging = responseFollowupVolunteer.paging;
                observer.next(followupVolunteerPage);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error loading followup volunteer List", statusType.error);
            });
        });
    }

    createFollowupVolunteer(followupVolunteer: FollowupVolunteer): Observable<FollowupVolunteerPage> {
        let followupVolunteerPage = new FollowupVolunteerPage();
        let params = "?page=0" + "&size=" + dbRequestPageSize;
        return Observable.create(observer => {
            console.log("Came Here : " + followupVolunteer.devoteeId + " : " + followupVolunteer.programId);
            this.httpService
            .post(connectionProperties.createFollowupVolunteer + params, followupVolunteer)
            .subscribe(response => {
                let responseFollowupVolunteer = JSON.parse(response._body);
                followupVolunteerPage.followupVolunteerList = responseFollowupVolunteer.data;
                followupVolunteerPage.paging = responseFollowupVolunteer.paging;
                observer.next(followupVolunteerPage);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error adding followup volunteer", statusType.error);
            });
        });
    }

    deleteFollowupVolunteer(programId: number, assignmentId: number): Observable<FollowupVolunteerPage> {
        let followupVolunteerPage = new FollowupVolunteerPage();
        let params = "?page=0" + "&size=" + dbRequestPageSize;
        return Observable.create(observer => {
            this.httpService
            .delete(connectionProperties.deleteFollowupVolunteer + '/' + programId + '/' + assignmentId + params)
            .subscribe(response => {
                let responseFollowupVolunteer = JSON.parse(response._body);
                followupVolunteerPage.followupVolunteerList = responseFollowupVolunteer.data;
                followupVolunteerPage.paging = responseFollowupVolunteer.paging;
                observer.next(followupVolunteerPage);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error deleting followup volunteer", statusType.error);
            });
        });
    }
}