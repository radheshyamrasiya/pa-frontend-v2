import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { routeConstants } from '../shared/app-properties';

@Component ({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
})

export class DashboardComponent {

    constructor(
        private router: Router,
    ) {}

    onMyFollowupsClick(): void {
        this.router.navigate([routeConstants.followup,routeConstants.followupProgram]);
    }

    onMyProgramsClick(): void {
        this.router.navigate([routeConstants.myPrograms]);
    }

    onCaptureContactClick(): void {
        this.router.navigate([routeConstants.captureContact]);
    }

    onCapturedListClick(): void {
        this.router.navigate([routeConstants.capturedList]);
    }
}