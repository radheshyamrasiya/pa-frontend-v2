import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Program, ProgramPage } from '../model/program.model';
import { Paging } from '../model/paging.model';
import { ProgramService } from './program.service';
import { LoginSessionService } from '../login/login-session.service';
import { routeConstants } from '../shared/app-properties';

@Component ({
    selector: "my-programs",
    templateUrl: "./my-programs.component.html",
})

export class MyProgramsComponent implements OnInit {
     contents: ProgramPage;

     constructor(
        private programService: ProgramService,
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
            page = this.programService.pageNumber;
        }
        
        this.programService.loadProgramList(page, this.loginService.getDevoteeId())
        .subscribe(contents => {
            this.contents = contents;
        });
    }
}