import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HistoryService } from './history.service';
import { History, HistoryPage } from '../model/history.model';
import { Paging } from '../model/paging.model';
import { routeConstants, colorCode } from '../shared/app-properties';

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
        private historyService: HistoryService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.colorCodeList = colorCode;
        this.contents = new HistoryPage();
        this.contents.historyList = [];
        this.contents.paging = new Paging();
        this.contents.paging.first = true;
        this.contents.paging.last = true;
        this.activatedRoute.params.subscribe(params => {
            this.devoteeId = +params[routeConstants.paramDevoteeId];
            if (this.devoteeId == undefined || this.devoteeId == null)
                return
            this.historyService.loadHistory(this.devoteeId, 0)
            .subscribe(historyPage => {
                this.contents = historyPage;
                if (this.contents.historyList.length) this.devoteeName = this.contents.historyList[0].ratedDevoteeName;
            }, err => {
                //Navigate to different page
            });
        });
    }

    onBackClick() {
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute, queryParams: {id: this.devoteeId} });
    }


    loadContents(page?: number) {
        if(page == undefined) {
            page = this.historyService.pageNumber;
        }
        this.historyService.loadHistory(
            this.devoteeId,
            page,
        ).subscribe(contents => {
            this.contents = contents;
        });
    }
}