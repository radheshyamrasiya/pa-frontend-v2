import { Injectable, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { HttpService } from '../shared/http.service';
import { connectionProperties, statusType, dbRequestPageSize } from '../shared/app-properties';
import { StatusService } from '../shared/status.service';

import { Program, ProgramPage } from '../model/program.model';

@Injectable()
export class ProgramService implements OnInit {
    pageNumber: number;

    constructor(
        private statusService: StatusService,
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        this.pageNumber = 0;
    }

    loadProgramList(page: number, mentorId?: number): Observable<ProgramPage> {
        let params = "?page=" + page + "&size=" + dbRequestPageSize;
        this.pageNumber = page;
        
        let queryUrl = connectionProperties.listProgram;
        if (mentorId != undefined) {
            //Un Comment once endpoint is enabled
            //queryUrl = connectionProperties.listYatra + "/" + adminId;
        }
        let programPage = new ProgramPage();
        return Observable.create(observer => {
            this.httpService
            .get(queryUrl + params)
            .subscribe(response => {
                let responseProgram = JSON.parse(response._body);
                programPage.programList = responseProgram.data;
                programPage.paging = responseProgram.paging;
                observer.next(programPage);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error loading List", statusType.error);
            });
        });
    }

    loadProgram(programId: number): Observable<Program> {
        return Observable.create(observer => {
            this.httpService
            .get(connectionProperties.updateProgram + '/' + programId)
            .subscribe(response => {
                let responseProgram = JSON.parse(response._body);
                observer.next(responseProgram.data);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error loading program", statusType.error);
            });
        });
    }

    createProgram(program: Program): Observable<Program> {
        return Observable.create(observer => {
            this.httpService
            .post(connectionProperties.createProgram, program)
            .subscribe(response => {
                let responseProgram = JSON.parse(response._body);
                observer.next(responseProgram);
                this.statusService.setFlag("Program Created", statusType.success);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error creating program", statusType.error);
            });
        });
    }

    updateProgram(program: Program): Observable<Program> {
        return Observable.create(observer => {
            this.httpService
            .put(connectionProperties.updateProgram + '/' + program.id, program)
            .subscribe(response => {
                let responseProgram = JSON.parse(response._body);
                observer.next(responseProgram);
                this.statusService.setFlag("Program Updated", statusType.success);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error updating program", statusType.error);
            });
        });
    }
}