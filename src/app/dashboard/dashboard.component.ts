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
    constructor(
        private router: Router,
        private loginService: LoginSessionService,
    ) {}

    ngOnInit() {
    }
}