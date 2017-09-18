import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
})

export class DashboardComponent {

    constructor(
        private router: Router,
    ) {}

    onLoginClick(): void {
        this.router.navigate(['/login']);
    }

    onMyFollowupsClick(): void {
        this.router.navigate(['/my-followups']);
    }

    onMyProgramsClick(): void {
        this.router.navigate(['/my-programs']);
    }

    onCaptureContactClick(): void {
        this.router.navigate(['/capture-contact']);
    }

    onCapturedListClick(): void {
        this.router.navigate(['/captured-list']);
    }
}