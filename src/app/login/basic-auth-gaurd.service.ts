import { Injectable }     from '@angular/core';
import { Router, CanActivate, CanActivateChild }    from '@angular/router';

import { LoginSessionService } from '../login/login-session.service';
import { LoginStatus, routeConstants } from '../shared/app-properties';

@Injectable()
export class BasicAuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private loginService: LoginSessionService,
    private router: Router,
  ) {}

  canActivate() {
    if (this.loginService.loginStatus == LoginStatus.loggedIn) {
      return true;
    }
    this.router.navigate([routeConstants.welcome]);
    return false;
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}