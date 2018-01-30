import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FollowupAssignment, FollowupAssignmentPage } from '../model/followup-assignment.model';
import { Paging } from '../model/entity.model';

import { HttpService } from '../shared/http.service';
import { LoginSessionService } from '../login/login-session.service';
import { routeConstants, connectionProperties } from '../shared/app-properties';
import { NavService } from '../shared/nav.service';

@Component ({
    selector: "my-followups",
    templateUrl: "./my-followups.component.html",
})

export class MyFollowupsComponent implements OnInit {
    contents: FollowupAssignmentPage;
    programId: number;
    activePanel: string;
    @Input() form: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private httpService: HttpService,
        private loginService: LoginSessionService,
        private navService: NavService,
    ) {}

    ngOnInit() {
        this.activePanel = "";
        this.contents = new FollowupAssignmentPage();
        this.contents.dataList = [];
        this.contents.paging = new Paging();
        this.contents.paging.first = true;
        this.contents.paging.last = true;

        this.route.params.subscribe(params => {
            this.programId = +params[routeConstants.paramsProgramId];

            this.route.queryParams.subscribe(params => {
                if (params["id"]) 
                    this.activePanel = params["id"] + "_id";
                this.loadContents();
            });
        });
    }

    onPhoneClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup, routeConstants.callResponse, this.programId, devoteeId]);
    }

    onHistoryClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup, routeConstants.history, this.programId, devoteeId]);
    }

    onProfileClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup, routeConstants.devoteeProfile, this.programId, devoteeId]);
    }

    onCommentClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup, routeConstants.writeComment, this.programId, devoteeId]);
    }
    
    loadContents(page?: number) {
        if(page == undefined) {
            let pageNum = this.navService.getNum("myFollowup" + this.programId + "PageNo");
            (pageNum==null)?page=0:page=pageNum;
        } else {
            this.navService.setNum("myFollowup" + this.programId + "PageNo", page);
        }
        this.httpService.getList(
            connectionProperties.myFollowUpListByProgram,
            {
                pathParams: "/" + this.loginService.getDevoteeId() + "/" + this.programId,
                page: page,
            }
        ).subscribe(contents => {
            this.contents = contents;
        });
    }

    onBackClick() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }
}