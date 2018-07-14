import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { routeConstants, connectionProperties } from '../shared/app-properties';
import { ProgramAssignment, ProgramAssignmentPage } from '../model/program-assignment.model';
import { FollowupVolunteer, FollowupVolunteerPage } from '../model/followup-volunteer.model';
import { FollowupAssignment, FollowupAssignmentPage } from '../model/followup-assignment.model';

import { Paging, Entity } from '../model/entity.model';
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
    followupAssignments: FollowupAssignmentPage;
    unassignedCount: number;

    volunteerAssignments: any;
    programId: number;
    unassignedParticipants: Entity[];
    allAttendeesOfVolunteers: any;
    assignmentCount: any;

    selectedValue: number;

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

        this.followupAssignments = new FollowupAssignmentPage();
        this.followupAssignments.dataList = [];
        this.followupAssignments.paging = new Paging();

        this.volunteerAssignments = {};
        this.allAttendeesOfVolunteers = {};
        this.assignmentCount = {};

        this.activatedRoute.params.subscribe(params => {
            this.programId = +params[routeConstants.paramsProgramId];
            this.loadAssignments();
        });
    }

    loadAssignments() {
        this.httpService.getList(connectionProperties.followupAssignmentByProgram, {
            page: 0,
            pathParams: "/" + this.programId,
        })
        .subscribe(followupAssignmentList => {
            if (followupAssignmentList!=undefined && followupAssignmentList!=null) {
                this.followupAssignments = followupAssignmentList as FollowupAssignmentPage;
                this.allAttendeesOfVolunteers = {};
                this.assignmentCount = {};
                for (let assignments of this.followupAssignments.dataList) {
                    if (this.allAttendeesOfVolunteers[(<FollowupAssignment>assignments).volunteerId] == undefined) {
                        this.allAttendeesOfVolunteers[(<FollowupAssignment>assignments).volunteerId] = [];
                    }
                    if (this.assignmentCount[(<FollowupAssignment>assignments).volunteerId] == undefined) {
                        this.assignmentCount[(<FollowupAssignment>assignments).volunteerId] = 0;
                    }
                    this.allAttendeesOfVolunteers[(<FollowupAssignment>assignments).volunteerId].push({
                        devoteeId: (<FollowupAssignment>assignments).attendeeId,
                        devoteeName: (<FollowupAssignment>assignments).attendeeName,
                        assignmentId: (<FollowupAssignment>assignments).id
                    });
                    this.assignmentCount[(<FollowupAssignment>assignments).volunteerId]++;
                }
                console.log(this.allAttendeesOfVolunteers);
                console.log(this.assignmentCount);

                //Get the list of participants for the program
                this.httpService.getList(connectionProperties.listProgramAssignment, {
                    page: 0,
                    pathParams: "/" + this.programId,
                })
                .subscribe(participantList => {
                    this.unassignedCount = 0;
                    if (participantList!=undefined && participantList!=null) {
                        this.participants = participantList as ProgramAssignmentPage;
                        this.unassignedParticipants = this.participants.dataList.filter(singleParticipant => {
                            if (followupAssignmentList.dataList.find(item => (<FollowupAssignment>item).attendeeId === (<ProgramAssignment>singleParticipant).attendeeId)!=undefined) {
                                return false;
                            }
                            this.unassignedCount++;
                            return true;
                        });
                        for (let participant of this.unassignedParticipants) {
                            this.volunteerAssignments[(<ProgramAssignment>participant).attendeeId] = null;
                        }
                    }

                    //Get the list of volunteers for the program
                    this.httpService.getList(connectionProperties.listFollowupVolunteer,{
                        page: 0,
                        pathParams: "/" + this.programId,
                    })
                    .subscribe(volunteerList => {
                        if (volunteerList!=undefined && volunteerList!=null) {
                            this.volunteers = volunteerList as FollowupVolunteerPage;
                        }
                    });
                });
            }
        });
    }

    onAssignFollowup(participantId: number) {
        let newFollowupAssignment: FollowupAssignment;
        if (this.volunteerAssignments[participantId]==null) {
            this.statusService.error("Select a volunteer before assignment");
            return;
        }
        
        newFollowupAssignment = new FollowupAssignment;
        newFollowupAssignment.attendeeId = participantId;
        newFollowupAssignment.programId = this.programId;
        newFollowupAssignment.volunteerId = +this.volunteerAssignments[participantId];
        this.httpService.post(connectionProperties.createFollowup, newFollowupAssignment)
        .subscribe(follwupAssignment => {
            this.statusService.success("Followup Assigned");
            this.loadAssignments();
        }, err=> {
            this.statusService.error("Assignment Failed");
        });
    }

    onRemoveVolunteerAssignment(assignmentId: number) {
        this.httpService.delete(connectionProperties.deleteFollowup + "/" + assignmentId)
        .subscribe(status => {
            this.statusService.success("Assignment Deleted Successful");
            this.loadAssignments();
        }, err => {
            this.statusService.error("Delete Assignment Failed");
        })
    }

    onClearAssignmentsClick() {
        this.httpService.delete(connectionProperties.deleteFollowupAssignmentsOfProgram + "/" + this.programId)
        .subscribe(status => {
            this.statusService.success("Assignments Cleared Successful");
            this.loadAssignments();
        }, err => {
            this.statusService.error("Delete Assignment Failed");
        });
    }

    onAutoAssign() {
        this.httpService.post(connectionProperties.autoAssignFollowup + '/' + this.programId,{})
        .subscribe(status => {
            this.statusService.success("Auto Assign Completed");
            this.loadAssignments();
        }, err => {
            this.statusService.error("Auto Assign Failed");
        });
    }

    onBackClick() {
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
}