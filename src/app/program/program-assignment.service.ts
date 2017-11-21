import { Injectable, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { HttpService } from '../shared/http.service';
import { connectionProperties, dbRequestPageSize } from '../shared/app-properties';
import { StatusService } from '../shared/status.service';

import { ProgramAssignment, ProgramAssignmentPage } from '../model/program-assignment.model';

@Injectable()
export class ProgramAssignmentService implements OnInit {
    pageNumber: number;

    constructor(
        private statusService: StatusService,
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        this.pageNumber = 0;
    }

    loadProgramAssignmentList(programId: number, page: number): Observable<ProgramAssignmentPage> {      
        let programAssignmentPage = new ProgramAssignmentPage();
        let params = "?page=" + page + "&size=" + dbRequestPageSize;
        return Observable.create(observer => {
            this.httpService
            .get(connectionProperties.listProgramAssignment + '/' + programId + params)
            .subscribe(response => {
                let responseProgramAssignment = JSON.parse(response._body);
                programAssignmentPage.programAssignmentList = responseProgramAssignment.data;
                programAssignmentPage.paging = responseProgramAssignment.paging;
                observer.next(programAssignmentPage);
                observer.complete();
            }, err => {
                this.statusService.error("Error loading program assignment List");
            });
        });
    }

    createProgramAssignment(programAssignment: ProgramAssignment): Observable<ProgramAssignmentPage> {
        let programAssignmentPage = new ProgramAssignmentPage();
        let params = "?page=0" + "&size=" + dbRequestPageSize;
        return Observable.create(observer => {
            this.httpService
            .post(connectionProperties.createProgramAssignment + params, programAssignment)
            .subscribe(response => {
                let responseProgramAssignment = JSON.parse(response._body);
                programAssignmentPage.programAssignmentList = responseProgramAssignment.data;
                programAssignmentPage.paging = responseProgramAssignment.paging;
                observer.next(programAssignmentPage);
                observer.complete();
            }, err => {
                this.statusService.error("Error adding participant");
            });
        });
    }

    deleteProgramAssignment(programId: number, assignmentId: number): Observable<ProgramAssignmentPage> {
        let programAssignmentPage = new ProgramAssignmentPage();
        let params = "?page=0" + "&size=" + dbRequestPageSize;
        return Observable.create(observer => {
            this.httpService
            .delete(connectionProperties.deleteProgramAssignment + '/' + programId + '/' + assignmentId + params)
            .subscribe(response => {
                let responseProgramAssignment = JSON.parse(response._body);
                programAssignmentPage.programAssignmentList = responseProgramAssignment.data;
                programAssignmentPage.paging = responseProgramAssignment.paging;
                observer.next(programAssignmentPage);
                observer.complete();
            }, err => {
                this.statusService.error("Error deleting participant");
            });
        });
    }
}