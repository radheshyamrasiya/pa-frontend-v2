import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routeConstants } from './shared/app-properties';
import { LoginSessionService } from './login/login-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginSessionService,
  ) {}

  ngOnInit() {

  }

  onDashboardClick(): void {
    this.router.navigate([routeConstants.dashboard]);
  }

  onLogoutClick(): void {
    this.loginService.logout();
  }
}
