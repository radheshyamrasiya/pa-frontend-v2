import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HistoryService } from './history.service';
import { History } from '../model/history.model';
import { routeConstants, colorCode } from '../shared/app-properties';

@Component({
    selector: 'history',
    templateUrl: './history.component.html',
})

export class HistoryComponent implements OnInit {
    historyList: History[];
    devoteeName: string;
    colorCodeList: string[];

    constructor(
        private historyService: HistoryService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.colorCodeList = colorCode;
        this.activatedRoute.params.subscribe(params => {
            this.historyService.loadHistory(+params[routeConstants.paramDevoteeId])
            .subscribe(historyList => {
                this.historyList = historyList;
                if (this.historyList.length) this.devoteeName = historyList[0].ratedDevoteeName;
            }, err => {
                console.log(err);
                //Navigate to different page
            });
        });
    }
}