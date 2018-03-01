import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Program, ProgramPage } from '../model/program.model';
import { Paging } from '../model/entity.model';
import { HttpService } from '../shared/http.service';
import { LoginSessionService } from '../login/login-session.service';
import { routeConstants, connectionProperties } from '../shared/app-properties';

@Component ({
    selector: "my-programs",
    templateUrl: "./my-programs.component.html",
})

export class MyProgramsComponent implements OnInit {
     contents: ProgramPage;

     constructor(
        private httpService: HttpService,
        private loginService: LoginSessionService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
     ) {}

     ngOnInit() {
        this.contents = new ProgramPage();
        this.contents.paging = new Paging();
        this.contents.paging.first = true;
        this.contents.paging.last = true;
        
        this.loadContents();
    }

    onManageProgram(programId: number) {
        this.router.navigate([routeConstants.myPrograms, routeConstants.manageProgram, programId]);
    }

    onAddParticipants(programId: number) {
        this.router.navigate([routeConstants.myPrograms, routeConstants.addParticipants, programId]);
    }

    onAddFollowupVolunteers(programId: number) {
        this.router.navigate([routeConstants.myPrograms, routeConstants.addFollowupVolunteers, programId]);
    }

    onAssignFollowups(programId: number) {
        this.router.navigate([routeConstants.myPrograms, routeConstants.assignFollowups, programId]);
    }

    onBackClick() {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }

    loadContents(page?: number) {
        if(page == undefined) {
            page = 0;
        }
        this.httpService.getList(connectionProperties.listProgramByMentor, {
            page: page,
            pathParams: "/" + this.loginService.getDevoteeId(),
        })
        .subscribe(contents => {
            this.contents = contents as ProgramPage;
        });
    }
}