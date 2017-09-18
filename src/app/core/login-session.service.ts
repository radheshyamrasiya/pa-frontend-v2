import { Injectable, OnInit } from '@angular/core';

import { LoginStatus } from '../shared/app-properties';
import { Devotee } from '../model/devotee.model';

import { FollowupSessionService } from './followup-session.service';



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

    constructor(private followupSession: FollowupSessionService) {}

    ngOnInit(): void {
        this.loginStatus = LoginStatus.loggedOut;
        this.devoteeId = 0;
    }

    login(userName: string, password: string): void {
        
        //Authentication Code

        //On Success
        this.loginStatus = LoginStatus.loggedIn;
        this.userName = userName;
        this.password = password;
        this.devoteeId = 1;

        this.followupSession.loadFollowupDevoteeList();
    }

    getDevoteeId(): number {
        return this.devoteeId;
    }

}