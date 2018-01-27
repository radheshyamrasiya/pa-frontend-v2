import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routeConstants } from '../shared/app-properties';

@Component({
    selector: 'my-followup-programs',
    templateUrl: 'my-followup-programs.component.html'
})

export class MyFollowupProgramsComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { 
    }
 
    followupForProgram(programId: number) {
        this.router.navigate([routeConstants.followup, routeConstants.followupProgram, programId]);
    }
}