import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { HttpService } from '../shared/http.service';
import { LoginSessionService } from './login-session.service';

@Component ({
    selector: 'login-page',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
    status = "No Status";
    username: string;
    password: string;

    constructor(
        private loginSessionService: LoginSessionService,
        private httpService: HttpService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.username = "";
        this.password = "";
    }

    onLoginClick(): void {
        this.status="clicked";
        this.httpService.init(this.username, this.password);
        this.loginSessionService.login(this.username, this.password);
    }
}
