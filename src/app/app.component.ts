import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { userRoles } from './login/user-roles';
import { routeConstants, statusType } from './shared/app-properties';
import { LoginStatus } from './shared/app-properties';
import { LoginSessionService } from './login/login-session.service';
import { StatusService } from './shared/status.service';

import { LoginComponent } from './login/login.component';
import { Status, StatusType } from './model/status.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public LoginStatus;
  isCollapsed=false;

  statusList: Status[];

  constructor(
    private router: Router,
    public loginService: LoginSessionService,
    public statusService: StatusService,
  ) {
    this.LoginStatus = LoginStatus;
  }

  ngOnInit() {
    this.statusList = [];
    this.statusService.statusPipe.subscribe(status => {
      let statusAlert = status as Status;
      this.statusList.push(statusAlert);
      setTimeout(() => {
        this.statusList.splice(this.statusList.indexOf(statusAlert),1)
      }, 5000);
    });
  }

  canShow(feature: string): boolean {
    if (!this.isLoggedIn()) return false;
    switch(feature) {
      case "capture":
        return true;
      case "logout":
        return true;
      case "followup":
        if (this.loginService.getRole() == userRoles.DEVOTEE) {
          return true;
        } else return false;
      case "super":
        if (this.loginService.getRole() == userRoles.ADMIN) {
          return true;
        } else return false;
      case "yatra":
        if (this.loginService.getRole() == userRoles.YATRA_ADMIN || 
            this.loginService.getRole() == userRoles.ADMIN) {
          return true;
        } else return false;
      case "program":
        if (this.loginService.getRole() == userRoles.MENTOR || 
        this.loginService.getRole() == userRoles.YATRA_ADMIN || 
        this.loginService.getRole() == userRoles.ADMIN) {
          return true;
        } else return false;
      case "userAccount":
        if (this.loginService.getRole() == userRoles.MENTOR || 
        this.loginService.getRole() == userRoles.YATRA_ADMIN || 
        this.loginService.getRole() == userRoles.ADMIN) {
          return true;
        } else return false;
      default:
        return false;
    }
  }

  isLoggedIn(): boolean {
    return (this.loginService.loginStatus===LoginStatus.loggedIn)?true:false;
  }

  onDashboardClick(): void {
    this.router.navigate([routeConstants.dashboard]);
  }

  onHomeClick(): void {
    this.router.navigate([routeConstants.welcome]);
  }

  onChangePasswordClick(): void {
    console.log('password edit');
    this.router.navigate([routeConstants.user, routeConstants.changePassword]);
  }

  onProfileEditClick(): void {
    this.router.navigate([routeConstants.user, routeConstants.editProfile]);
  }

  onLogoutClick(): void {
    this.loginService.logout();
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
