import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { routeConstants, connectionProperties } from '../shared/app-properties';
import { ProgramAssignment, ProgramAssignmentPage } from '../model/program-assignment.model';
import { FollowupVolunteer, FollowupVolunteerPage } from '../model/followup-volunteer.model';
import { Paging } from '../model/entity.model';
import { Devotee } from '../model/devotee.model';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';

@Component({
    selector: 'assign-followups',
    templateUrl: 'assign-followups.component.html'
})

export class AssignFollowupsComponent implements OnInit {
    participants: ProgramAssignmentPage;
    volunteers: FollowupVolunteerPage;
    programId: number;

    constructor(
        private httpService: HttpService,
        private activatedRoute: ActivatedRoute,
        private statusService: StatusService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.participants = new ProgramAssignmentPage();
        this.participants.dataList = [];
        this.participants.paging = new Paging();

        this.volunteers = new FollowupVolunteerPage();
        this.volunteers.dataList = [];
        this.volunteers.paging = new Paging();

        this.activatedRoute.params.subscribe(params => {
            this.programId = +params[routeConstants.paramsProgramId];
            this.loadAssignments();
        });
    }

    loadAssignments() {
        this.httpService.getList(connectionProperties.listProgramAssignment, {
            page: 0,
            pathParams: "/" + this.programId,
        })
        .subscribe(assignmentsList => {
            if (assignmentsList!=undefined && assignmentsList!=null) {
                this.participants = assignmentsList as ProgramAssignmentPage;
            }
        });

        this.httpService.getList(connectionProperties.listFollowupVolunteer,{
            page: 0,
            pathParams: "/" + this.programId,
        })
        .subscribe(volunteerList => {
            if (volunteerList!=undefined && volunteerList!=null) {
                this.volunteers = volunteerList as FollowupVolunteerPage;
            }
        });
    }
}