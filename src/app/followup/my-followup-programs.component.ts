import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FollowupAssignment, FollowupAssignmentPage } from '../model/followup-assignment.model';
import { LoginSessionService } from '../login/login-session.service';
import { Paging } from '../model/entity.model';
import { HttpService } from '../shared/http.service';
import { routeConstants, connectionProperties } from '../shared/app-properties';
import { NavService } from '../shared/nav.service';

@Component({
    selector: 'my-followup-programs-component',
    templateUrl: 'my-followup-programs.component.html'
})

export class MyFollowupProgramsComponent implements OnInit {
    contents: FollowupAssignmentPage;

    constructor(
        private httpService: HttpService,
        private navService: NavService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private loginService: LoginSessionService,
    ) { }

    ngOnInit() {
        this.contents = new FollowupAssignmentPage();
        this.contents.paging = new Paging();
        this.contents.paging.first = true;
        this.contents.paging.last = true;

        this.loadContents();
    }

    onStartFollowup(programId: number) {
        this.router.navigate([routeConstants.followup, routeConstants.followupProgram, programId]);
    }

    onBackClick() {
        this.router.navigate([routeConstants.dashboard]);
    }

    loadContents(page?: number) {
        if(page == undefined) {
            let pageNum = this.navService.getNum("myFollowupProgramsListPageNo");
            (pageNum==null)?page=0:page=pageNum;
        } else {
            this.navService.setNum("myFollowupProgramsListPageNo", page);
        }
        this.httpService.getList(
            connectionProperties.myFollowupPrograms + '/' + this.loginService.getDevoteeId(),
            {
                page: page
            }
        )
        .subscribe(contents => {
            this.contents = contents;
        });
    }
}