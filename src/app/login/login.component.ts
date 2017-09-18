import { Component } from '@angular/core';

import { HttpService } from '../shared/http.service';
import { LoginSessionService } from '../core/login-session.service';

@Component ({
    selector: 'login-page',
    templateUrl: './login.component.html',
})

export class LoginComponent {
    status = "No Status";
    username: string;
    password: string;

    constructor(
        private loginSessionService: LoginSessionService,
        private httpService: HttpService,
    ) {}

    onLoginClick(): void {
        this.status="clicked";
        this.httpService.init(this.username, this.password);
        this.loginSessionService.login(this.username, this.password);
    }
}