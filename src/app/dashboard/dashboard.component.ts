import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { userRoles } from '../login/user-roles';
import { LoginSessionService } from '../login/login-session.service';

import { FollowupReportComponent } from '../reports/followup-report/followup-report.component';
import { AttendanceReportComponent } from '../reports/attendance-report/attendance-report.component';

@Component ({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit{
    enableMyFollowups = false;
    enableMyPrograms = false;
    enableCaptureContact = false;
    enableCapturedList= false;
    enableYatraAdmin = false;
    enableSuperAdmin = false;
    manageUserAccount = false;

    constructor(
        private router: Router,
        private loginService: LoginSessionService,
    ) {}

    ngOnInit() {
        console.log(this.loginService.getRole());
        if (this.loginService.getRole() == userRoles.DEVOTEE) {
            this.enableMyFollowups = true;
            //this.enableMyPrograms = true;
            this.enableCaptureContact = true;
            this.enableCapturedList= true;
            //this.enableYatraAdmin = true;
            //this.enableSuperAdmin = true;
            //this.manageUserAccount = true;
        }

        if (this.loginService.getRole() == userRoles.MENTOR) {
            this.enableMyFollowups = true;
            this.enableMyPrograms = true;
            this.enableCaptureContact = true;
            this.enableCapturedList= true;
            //this.enableYatraAdmin = true;
            //this.enableSuperAdmin = true;
            this.manageUserAccount = true;
        }

        if (this.loginService.getRole() == userRoles.YATRA_ADMIN) {
            //this.enableMyFollowups = true;
            //this.enableMyPrograms = true;
            //this.enableCaptureContact = true;
            //this.enableCapturedList= true;
            this.enableYatraAdmin = true;
            //this.enableSuperAdmin = true;
            this.manageUserAccount = true;
        }

        if (this.loginService.getRole() == userRoles.ADMIN) {
            this.enableMyFollowups = true;
            this.enableMyPrograms = true;
            this.enableCaptureContact = true;
            this.enableCapturedList= true;
            this.enableYatraAdmin = true;
            this.enableSuperAdmin = true;
            this.manageUserAccount = true;
        }
    }

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

    onYatraAdminClick() {
        this.router.navigate([routeConstants.yatra]);
    }

    onSuperAdminClick() {
        this.router.navigate([routeConstants.superAdmin]);
    }

    onManageUserAccountClick() {
        this.router.navigate([routeConstants.manageUserAccount]);
    }
}