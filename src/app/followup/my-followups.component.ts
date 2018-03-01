import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FollowupAssignment, FollowupAssignmentPage } from '../model/followup-assignment.model';
import { Paging } from '../model/entity.model';
import { Program } from '../model/program.model';

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
    program: Program;
    activePanel: string;
    taskHeading: string;
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

        this.program = new Program();
        this.program.followupDescription = [];
        this.taskHeading = "Retriving Tasks";

        this.route.params.subscribe(params => {
            this.program.id=+params[routeConstants.paramsProgramId];
            this.fetchProgram(+params[routeConstants.paramsProgramId]);

            this.route.queryParams.subscribe(params => {
                if (params["id"]) 
                    this.activePanel = params["id"] + "_id";
                this.loadContents();
            });
        });
    }

    fetchProgram(programId: number) {
        this.httpService.getData(connectionProperties.getProgram,
            '/' + programId
        ).subscribe(program => {
            this.program = program as Program;
            console.log("No of Tasks: " + this.program.followupDescription.length)
            if(this.program.followupDescription.length == 0) {
                this.taskHeading = "No Tasks to Followup";
            } else {
                this.taskHeading = "Tasks to Followup";
            }
        }, err => {
            //Handle Error
        });
    }

    onPhoneClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup, routeConstants.callResponse, this.program.id, devoteeId]);
    }

    onHistoryClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup, routeConstants.history, this.program.id, devoteeId]);
    }

    onProfileClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup, routeConstants.devoteeProfile, this.program.id, devoteeId]);
    }

    onCommentClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup, routeConstants.writeComment, this.program.id, devoteeId]);
    }
    
    loadContents(page?: number) {
        if(page == undefined) {
            let pageNum = this.navService.getNum("myFollowup" + this.program.id + "PageNo");
            (pageNum==null)?page=0:page=pageNum;
        } else {
            this.navService.setNum("myFollowup" + this.program.id + "PageNo", page);
        }
        this.httpService.getList(
            connectionProperties.myFollowUpListByProgram,
            {
                pathParams: "/" + this.loginService.getDevoteeId() + "/" + this.program.id,
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