import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { routeConstants, connectionProperties } from '../shared/app-properties';
import { FollowupVolunteer, FollowupVolunteerPage } from '../model/followup-volunteer.model';
import { Paging } from '../model/entity.model';
import { Devotee } from '../model/devotee.model';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';

@Component({
    selector: 'add-followup-volunteers',
    templateUrl: 'add-followup-volunteers.component.html'
})

export class AddFollowupVolunteersComponent implements OnInit {
    contents: FollowupVolunteerPage;
    email: string;
    programId: number;

    constructor(
        private httpService: HttpService,
        private activatedRoute: ActivatedRoute,
        private statusService: StatusService,
        private router: Router,
    ) { }

    ngOnInit() { 
        this.contents = new FollowupVolunteerPage();
        this.contents.dataList = [];
        this.contents.paging = new Paging();

        this.activatedRoute.params.subscribe(params => {
            this.programId = +params[routeConstants.paramsProgramId];
        });
        this.loadContents(0);
    }

    loadContents(page: number) {
        this.httpService.getList(connectionProperties.listFollowupVolunteer, {
            page: page,
            pathParams: "/" + this.programId,
        })
        .subscribe(volunteerList => {
            if (volunteerList!= undefined && volunteerList!=null) {
                this.contents = volunteerList;
            } 
        });
    }

    onVolunteerAddClick() {
        this.httpService.getData(connectionProperties.devoteesByEmailId, {
            queryParams: {email: this.email}
        })
        .subscribe(devotee => {
            if (devotee==undefined || devotee == null) {
                this.statusService.error("No devotee found for email id: " + this.email);
                return
            }
            let followupVolunteer =  new FollowupVolunteer();
            followupVolunteer.devoteeId = (<Devotee>devotee).id;
            followupVolunteer.programId = this.programId;
            
            this.httpService.postAndReturnList(connectionProperties.createFollowupVolunteer, '', followupVolunteer)
            .subscribe(volunteerList => {
                if (volunteerList!= undefined && volunteerList!=null) {
                    this.contents = volunteerList;
                } 
            });
        });
    }

    onRemoveVolunteerClick(assignmentId: number) {
        this.httpService.deleteAndReturnList(connectionProperties.deleteFollowupVolunteer, '/' + this.programId + '/' + assignmentId)
        .subscribe(volunteerList => {
            if (volunteerList!= undefined && volunteerList!=null) {
                this.contents = volunteerList;
            } 
        });
    }

    onBackClick() {
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
}