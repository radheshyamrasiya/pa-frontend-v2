import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../shared/http.service';
import { History, HistoryPage } from '../model/history.model';
import { Paging } from '../model/entity.model';
import { routeConstants, colorCode, connectionProperties } from '../shared/app-properties';

@Component({
    selector: 'history',
    templateUrl: './history.component.html',
})

export class HistoryComponent implements OnInit {
    contents: HistoryPage;
    devoteeName: string;
    colorCodeList: string[];
    devoteeId: number;


    constructor(
        private httpService: HttpService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.colorCodeList = colorCode;
        this.contents = new HistoryPage();
        this.contents.dataList = [];
        this.contents.paging = new Paging();
        this.contents.paging.first = true;
        this.contents.paging.last = true;
        this.activatedRoute.params.subscribe(params => {
            this.devoteeId = +params[routeConstants.paramDevoteeId];
            console.log(this.router.routerState.snapshot.url);
            console.log(routeConstants.followup);
            if (this.devoteeId == undefined || this.devoteeId == null)
                return
            this.httpService.getList(connectionProperties.historyOf, {
                pathParams: "/" + this.devoteeId,
                page: 0,
                sortString: 'timeStamp,desc',
            })
            .subscribe(historyPage => {
                this.contents = historyPage as HistoryPage;
                if (this.contents.dataList.length) this.devoteeName = (<History>this.contents.dataList[0]).ratedDevoteeName;
            }, err => {
                //Navigate to different page
            });
        });
    }

    onBackClick() {
        let programId: number;
        this.activatedRoute.params.subscribe(params => {
            programId = +params[routeConstants.paramsProgramId];
            if(this.router.routerState.snapshot.url.startsWith(routeConstants.followup,1)) {
                this.router.navigate(['../../../', routeConstants.followupProgram, programId], {relativeTo: this.activatedRoute, queryParams: {id: this.devoteeId} });    
            } else if (this.router.routerState.snapshot.url.startsWith(routeConstants.myPrograms + '/' + routeConstants.addParticipants, 1)) {
                this.router.navigate(['../../../', programId], {relativeTo: this.activatedRoute, queryParams: {id: this.devoteeId} });
            } else {
                this.router.navigate(['../../'], {relativeTo: this.activatedRoute, queryParams: {id: this.devoteeId} });
            }    
        });
    }


    loadContents(page?: number) {
        if(page == undefined) {
            page = 0;
        }
        this.httpService.getList(connectionProperties.historyOf, {
            pathParams: "/" + this.devoteeId,
            page: page,
            sortString: 'timeStamp,desc',
        })
        .subscribe(contents => {
            this.contents = contents;
        });
    }
}