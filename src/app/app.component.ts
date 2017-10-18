import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routeConstants, statusType } from './shared/app-properties';
import { LoginSessionService } from './login/login-session.service';
import { StatusService } from './shared/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginSessionService,
    private statusService: StatusService,
  ) {}

  ngOnInit() {
    this.statusService.resetDefaultFlag();
  }

  onDashboardClick(): void {
    this.router.navigate([routeConstants.dashboard]);
  }

  onLogoutClick(): void {
    this.loginService.logout();
  }
}
