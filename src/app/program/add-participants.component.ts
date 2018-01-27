import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { routeConstants, connectionProperties } from '../shared/app-properties';
import { ProgramAssignment, ProgramAssignmentPage } from '../model/program-assignment.model';
import { Paging } from '../model/entity.model';
import { Devotee } from '../model/devotee.model';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';

@Component({
    selector: 'add-participants',
    templateUrl: 'add-participants.component.html'
})

export class AddParticipantsComponent implements OnInit {
    contents: ProgramAssignmentPage;
    email: string;
    programId: number;

    constructor(
        private httpService: HttpService,
        private activatedRoute: ActivatedRoute,
        private statusService: StatusService,
        private router: Router,
    ) { }

    ngOnInit() { 
        this.contents = new ProgramAssignmentPage();
        this.contents.dataList = [];
        this.contents.paging = new Paging();

        this.activatedRoute.params.subscribe(params => {
            this.programId = +params[routeConstants.paramsProgramId];
        });
        this.loadContents(0);
    }

    loadContents(page: number) {
        this.httpService.getList(connectionProperties.listProgramAssignment, {
            page: page,
            pathParams: "/" + this.programId,
        })
        .subscribe(volunteerList => {
            if (volunteerList!= undefined && volunteerList!=null) {
                this.contents = volunteerList as ProgramAssignmentPage;
            } 
        });
    }

    onParticipantAddClick() {
        this.httpService.getData(connectionProperties.devoteesByEmailId, {
            queryParams: {email: this.email}
        })
        .subscribe(devotee => {
            if (devotee==undefined || devotee == null) {
                this.statusService.error("No devotee found for email id: " + this.email);
                return
            }
            let programAssignment =  new ProgramAssignment();
            programAssignment.attendeeId = (<Devotee>devotee).id;
            programAssignment.programId = this.programId;
            
            this.httpService.postAndReturnList(connectionProperties.createProgramAssignment,'', programAssignment)
            .subscribe(volunteerList => {
                if (volunteerList!= undefined && volunteerList!=null) {
                    this.contents = volunteerList;
                } 
            });
        });
    }

    onRemoveParticipantClick(assignmentId: number) {
        this.httpService.deleteAndReturnList(connectionProperties.deleteProgramAssignment, "/" + this.programId + "/" + assignmentId)
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