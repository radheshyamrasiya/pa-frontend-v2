import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { FollowupVolunteer, FollowupVolunteerPage } from '../model/followup-volunteer.model';
import { Paging } from '../model/paging.model';

import { FollowupVolunteerService } from '../followup/followup-volunteer.service';
import { DevoteeService } from '../devotee/devotee.service';
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
        private followVolunteerService: FollowupVolunteerService,
        private devoteeService: DevoteeService,
        private activatedRoute: ActivatedRoute,
        private statusService: StatusService,
        private router: Router,
    ) { }

    ngOnInit() { 
        this.contents = new FollowupVolunteerPage();
        this.contents.followupVolunteerList = [];
        this.contents.paging = new Paging();

        this.activatedRoute.params.subscribe(params => {
            this.programId = +params[routeConstants.paramsProgramId];
        });
        this.loadContents(0);
    }

    loadContents(page: number) {
        this.followVolunteerService.loadFollowupVolunteerList(this.programId, page)
        .subscribe(volunteerList => {
            if (volunteerList!= undefined && volunteerList!=null) {
                this.contents = volunteerList;
            } 
        });
    }

    onVolunteerAddClick() {
        this.devoteeService.getDevoteeByEmailId(this.email).subscribe(devotee => {
            if (devotee==undefined || devotee == null) {
                this.statusService.error("No devotee found for email id: " + this.email);
                return
            }
            let followupVolunteer =  new FollowupVolunteer();
            followupVolunteer.devoteeId = devotee.id;
            followupVolunteer.programId = this.programId;
            
            this.followVolunteerService.createFollowupVolunteer(followupVolunteer)
            .subscribe(volunteerList => {
                if (volunteerList!= undefined && volunteerList!=null) {
                    this.contents = volunteerList;
                } 
            });
        });
    }

    onRemoveVolunteerClick(assignmentId: number) {
        this.followVolunteerService.deleteFollowupVolunteer(this.programId, assignmentId)
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