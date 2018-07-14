import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routeConstants, statusType } from './shared/app-properties';
import { LoginStatus } from './shared/app-properties';
import { LoginSessionService } from './login/login-session.service';
import { StatusService } from './shared/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public LoginStatus;

  constructor(
    private router: Router,
    private loginService: LoginSessionService,
    public statusService: StatusService,
  ) {
    this.LoginStatus = LoginStatus;
  }

  ngOnInit() {
    this.statusService.resetDefaultFlag();
  }

  onDashboardClick(): void {
    this.router.navigate([routeConstants.dashboard]);
  }

  onChangePasswordClick(): void {
    console.log('password edit');
    this.router.navigate([routeConstants.user, routeConstants.changePassword]);
  }

  onLogoutClick(): void {
    this.loginService.logout();
  }
}
