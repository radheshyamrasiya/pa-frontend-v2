import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { PreachingProgram } from '../model/preaching-program.model';
import { FollowupSessionService } from './followup-session.service';

@Component({
    selector: 'my-followup-programs',
    templateUrl: 'my-followup-programs.component.html'
})

export class MyFollowupProgramsComponent implements OnInit {
    programList: PreachingProgram[];

    constructor(
        private followupSession: FollowupSessionService,
        private router: Router,
    ) { }

    ngOnInit() { 
        this.programList = this.followupSession.getProgramList();
        console.log(this.programList.toString() + "Program List Log");
    }
 
    followupForProgram(programId: number) {
        this.router.navigate([routeConstants.followup, routeConstants.followupProgram, programId]);
    }
}