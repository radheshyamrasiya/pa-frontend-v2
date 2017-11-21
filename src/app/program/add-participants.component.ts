import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { ProgramAssignment, ProgramAssignmentPage } from '../model/program-assignment.model';
import { Paging } from '../model/paging.model';

import { ProgramAssignmentService } from '../program/program-assignment.service';
import { DevoteeService } from '../devotee/devotee.service';
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
        private programAssignmentService: ProgramAssignmentService,
        private devoteeService: DevoteeService,
        private activatedRoute: ActivatedRoute,
        private statusService: StatusService,
        private router: Router,
    ) { }

    ngOnInit() { 
        this.contents = new ProgramAssignmentPage();
        this.contents.programAssignmentList = [];
        this.contents.paging = new Paging();

        this.activatedRoute.params.subscribe(params => {
            this.programId = +params[routeConstants.paramsProgramId];
        });
        this.loadContents(0);
    }

    loadContents(page: number) {
        this.programAssignmentService.loadProgramAssignmentList(this.programId, page)
        .subscribe(volunteerList => {
            if (volunteerList!= undefined && volunteerList!=null) {
                this.contents = volunteerList;
            } 
        });
    }

    onParticipantAddClick() {
        this.devoteeService.getDevoteeByEmailId(this.email).subscribe(devotee => {
            if (devotee==undefined || devotee == null) {
                this.statusService.error("No devotee found for email id: " + this.email);
                return
            }
            let programAssignment =  new ProgramAssignment();
            programAssignment.attendeeId = devotee.id;
            programAssignment.programId = this.programId;
            
            this.programAssignmentService.createProgramAssignment(programAssignment)
            .subscribe(volunteerList => {
                if (volunteerList!= undefined && volunteerList!=null) {
                    this.contents = volunteerList;
                } 
            });
        });
    }

    onRemoveParticipantClick(assignmentId: number) {
        this.programAssignmentService.deleteProgramAssignment(this.programId, assignmentId)
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