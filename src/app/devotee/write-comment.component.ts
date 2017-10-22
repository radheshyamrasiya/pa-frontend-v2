import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { routeConstants, statusType } from '../shared/app-properties';
import { Devotee } from '../model/devotee.model';
import { DevoteeService } from "./devotee.service";
import { LoginSessionService } from '../login/login-session.service';

import { History } from '../model/history.model';
import { HistoryService } from './history.service';
import { StatusService } from '../shared/status.service';

@Component ({
    selector: 'write-comment',
    templateUrl: './write-comment.component.html',
})

export class WriteCommentComponent implements OnInit {
    devotee: Devotee;
    history: History;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private devoteeService: DevoteeService,
        private loginSession: LoginSessionService, 
        private historyService: HistoryService,
        private statusService: StatusService,
    ) {};

    ngOnInit() {
        this.devotee = new Devotee;
        this.history = new History;
        this.history.rating = 0;
        this.history.commentedByDevoteeId = this.loginSession.devoteeId;
        this.activatedRoute.params.subscribe((params: Params) => {
            this.history.ratedDevoteeId = +params[routeConstants.paramDevoteeId];
            this.devoteeService.loadDevotee(this.history.ratedDevoteeId)
            .subscribe(devotee => {
                this.devotee = new Devotee;
                this.devotee = devotee;
            }, err => {
                //Route to a different Page
            });
        });
    }

    onSaveClick() {
        if(this.history.rating == 0) {
            this.statusService.setFlag("Kindly rate the devotee!", statusType.error);
            return;
        }
        this.history.timeStamp = Date.now();
        this.historyService.writeComment(this.history)
        .subscribe(history => {
            //Check the object if needed
        }, err => {
            console.log(err);
        });
        this.onBackClick();
    }

    onBackClick() {
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute, queryParams: {id: this.devotee.id} });
    }
}