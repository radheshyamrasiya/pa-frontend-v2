import { Injectable, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { HttpService } from '../shared/http.service';
import { connectionProperties, statusType, dbRequestPageSize } from '../shared/app-properties';
import { StatusService } from '../shared/status.service';

import { ProgramAreaSubscription, ProgramAreaSubscriptionPage } from '../model/program-area-subscription.model';

@Injectable()
export class ProgramAreaSubscriptionService implements OnInit {
    pageNumber: number;

    constructor(
        private statusService: StatusService,
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        this.pageNumber = 0;
    }

    loadProgramAreaSubscriptionList(programId: number): Observable<ProgramAreaSubscriptionPage> {      
        let programAreaSubscriptionPage = new ProgramAreaSubscriptionPage();
        return Observable.create(observer => {
            this.httpService
            .get(connectionProperties.listProgramAreaSubscription + '/' + programId)
            .subscribe(response => {
                let responseProgramAreaSubscription = JSON.parse(response._body);
                programAreaSubscriptionPage.programAreaSubscriptionList = responseProgramAreaSubscription.data;
                programAreaSubscriptionPage.paging = responseProgramAreaSubscription.paging;
                observer.next(programAreaSubscriptionPage);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error loading program area subscription List", statusType.error);
            });
        });
    }

    createProgramAreaSubscription(programAreaSubscription: ProgramAreaSubscription): Observable<ProgramAreaSubscriptionPage> {
        let programAreaSubscriptionPage = new ProgramAreaSubscriptionPage();
        return Observable.create(observer => {
            this.httpService
            .post(connectionProperties.createProgramAreaSubscription, programAreaSubscription)
            .subscribe(response => {
                let responseProgramAreaSubscription = JSON.parse(response._body);
                programAreaSubscriptionPage.programAreaSubscriptionList = responseProgramAreaSubscription.data;
                programAreaSubscriptionPage.paging = responseProgramAreaSubscription.paging;
                observer.next(programAreaSubscriptionPage);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error creating program area subscription", statusType.error);
            });
        });
    }

    deleteProgramAreaSubscription(programId: number, programAreaSubscriptionId: number): Observable<ProgramAreaSubscriptionPage> {
        let programAreaSubscriptionPage = new ProgramAreaSubscriptionPage();
        return Observable.create(observer => {
            this.httpService
            .delete(connectionProperties.deleteProgramAreaSubscription + '/' + programId + '/' + programAreaSubscriptionId)
            .subscribe(response => {
                let responseProgramAreaSubscription = JSON.parse(response._body);
                programAreaSubscriptionPage.programAreaSubscriptionList = responseProgramAreaSubscription.data;
                programAreaSubscriptionPage.paging = responseProgramAreaSubscription.paging;
                observer.next(programAreaSubscriptionPage);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error removing program area subscription", statusType.error);
            });
        });
    }
}