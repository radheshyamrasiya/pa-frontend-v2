import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { routeConstants, statusType, connectionProperties } from '../shared/app-properties';
import { Devotee } from '../model/devotee.model';
import { HttpService } from "../shared/http.service";
import { LoginSessionService } from '../login/login-session.service';

import { History } from '../model/history.model';
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
        private httpService: HttpService,
        private loginSession: LoginSessionService, 
        private statusService: StatusService,
    ) {};

    ngOnInit() {
        this.devotee = new Devotee;
        this.history = new History;
        this.history.rating = 0;
        this.history.commentedByDevoteeId = this.loginSession.devoteeId;
        this.activatedRoute.params.subscribe((params: Params) => {
            this.history.ratedDevoteeId = +params[routeConstants.paramDevoteeId];
            this.httpService.getData(connectionProperties.devotees, "/" + this.history.ratedDevoteeId)
            .subscribe(devotee => {
                this.devotee = new Devotee;
                this.devotee = devotee as Devotee;
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
        this.httpService.postAndReturnData(connectionProperties.writeHistory, '', this.history)
        .subscribe(history => {
            //Check the object if needed
            this.statusService.success("Updated Successfully");
        }, err => {
            console.log(err);
        });
        this.onBackClick();
    }

    onBackClick() {
        let programId: number;
        this.activatedRoute.params.subscribe(params => {
            programId = +params[routeConstants.paramsProgramId];
            if(this.router.routerState.snapshot.url.startsWith(routeConstants.followup,1)) {
                this.router.navigate(['../../../', routeConstants.followupProgram, programId], {relativeTo: this.activatedRoute, queryParams: {id: this.devotee.id} });    
            } else if (this.router.routerState.snapshot.url.startsWith(routeConstants.myPrograms + '/' + routeConstants.addParticipants, 1)) {
                this.router.navigate(['../../../', programId], {relativeTo: this.activatedRoute, queryParams: {id: this.devotee.id} });
            } else {
                this.router.navigate(['../../'], {relativeTo: this.activatedRoute, queryParams: {id: this.devotee.id} });
            }    
        });
    }
}