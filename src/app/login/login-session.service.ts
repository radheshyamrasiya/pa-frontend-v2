import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginStatus } from '../shared/app-properties';

import { HttpService } from '../shared/http.service';
import { connectionProperties, routeConstants } from '../shared/app-properties';
import { LoginGetQueryModel } from '../model-get/login-get-query.model';

import { FollowupSessionService } from '../followup/followup-session.service';
import { CaptureSessionService } from '../capture/capture-session.service';


/*
Name: LoginSessionService
Purpose: To maintain the identity of devotee logged in such as roles and other details
*/

@Injectable()
export class LoginSessionService implements OnInit {
    loginStatus: LoginStatus;
    userName: string;
    password: string;
    devoteeId: number;
    devoteeName: string;
    role: string;

    constructor(
        private followupSession: FollowupSessionService,
        private captureSession: CaptureSessionService,
        private httpService: HttpService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.loginStatus = LoginStatus.loggedOut;
        this.devoteeId = 0;
    }

    login(username: string, password: string): void {
        console.log(connectionProperties.login);
        //Authentication Code
        this.httpService
            .get(connectionProperties.login + "/" + username)
            .subscribe(res => {
                let loginResponse = JSON.parse(res._body);
                this.loginStatus = LoginStatus.loggedIn;
                this.userName = username;
                this.password = password;
                this.devoteeId = loginResponse.data.devoteeId;
                this.devoteeName = loginResponse.data.devoteeName;
                this.role = loginResponse.data.role;

                this.followupSession.loadFollowupDevoteeList();
                this.captureSession.loadCaptureDevoteeList(this.devoteeId);
                this.router.navigate([routeConstants.dashboard]);
            }, err => {
                console.log(err);
                this.loginStatus = LoginStatus.loggedOut;
                this.userName = "";
                this.password = "";
                this.devoteeId = 0;
                this.router.navigate([routeConstants.login]);
            });
    }

    logout(): void {
        this.loginStatus = LoginStatus.loggedOut;
        this.userName = "";
        this.password = "";
        this.devoteeId = 0;
        this.router.navigate([routeConstants.login]);
    }

    getDevoteeId(): number {
        return this.devoteeId;
    }

}