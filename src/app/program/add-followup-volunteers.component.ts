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
    searchContextParams: any;

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
            this.searchContextParams = {programId: this.programId};
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

    onVolunteerAddClick(devoteeId: number) {
        console.log(`You want to add devotee ${devoteeId} as volunteer`);
        this.httpService.getData(`${connectionProperties.devotees}/${devoteeId}`)
            .subscribe((devotee) => {
                let followupVolunteer = new FollowupVolunteer();
                followupVolunteer.devoteeId = (<Devotee>devotee).id;
                followupVolunteer.programId = this.programId;

                this.httpService.postAndReturnList(connectionProperties.createFollowupVolunteer, '', followupVolunteer)
                    .subscribe(volunteerList => {
                        if (volunteerList != undefined && volunteerList != null) {
                            this.contents = volunteerList;
                        }
                    })
            })
    }

    onRemoveVolunteerClick(assignmentId: number) {
        this.httpService.deleteAndReturnList(connectionProperties.deleteFollowupVolunteer, '/' + this.programId + '/' + assignmentId)
        .subscribe(volunteerList => {
            if (volunteerList!= undefined && volunteerList!=null) {
                this.contents = volunteerList;
            }
        });
    }

    onAddAsFollowupVolunteerClick(assignment: any) {
        assignment.followupVolunteer = true;
        this.httpService.putAndReturnData(`${connectionProperties.createFollowupVolunteer}/${assignment.id}`, '', assignment)
            .subscribe((assignmentData) => {
                // success, do nothing since already did optimistic update
            }, (err) => {
                this.statusService.error(`Failed to add as followup volunteer`);
                assignment.followupVolunteer = false;
            })
    }

    onRemoveAsFollowupVolunteerClick(assignment: any) {
        assignment.followupVolunteer = false;
        this.httpService.putAndReturnData(`${connectionProperties.createFollowupVolunteer}/${assignment.id}`, '', assignment)
            .subscribe((assignmentData) => {
                // success, do nothing since already did optimistic update
            }, (err) => {
                this.statusService.error('Failed to remove as followup volunteer');
                assignment.followupVolunteer = true;
            })
    }

    onBackClick() {
        this.router.navigate(['../../',routeConstants.manageProgram,this.programId], {relativeTo: this.activatedRoute});
    }
}
