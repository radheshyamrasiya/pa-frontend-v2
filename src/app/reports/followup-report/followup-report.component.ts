import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../shared/http.service';
import { LoginSessionService } from '../../login/login-session.service';

import { FollowupReport, FollowupProgramReport, FollowupVolunteerReport } from '../../model/followup-report.model';
import { connectionProperties, routeConstants } from '../../shared/app-properties';

@Component({
  selector: 'app-followup-report',
  templateUrl: './followup-report.component.html',
})

export class FollowupReportComponent implements OnInit {
  objectKeys = Object.keys;

  @Input() programId: number; //0 represents all programs
  @Input() mentorId: number; //defaults to logged in user
  @Input() detailed: boolean;
  

  followupReport: FollowupReport;

  constructor(
    private httpService: HttpService,
    private loginService: LoginSessionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.followupReport = new FollowupReport();
    this.followupReport.programReportList = [];

    if (this.programId == undefined) this.programId = 0;
    if (this.mentorId == undefined) this.mentorId = this.loginService.devoteeId;

    this.httpService.getData(connectionProperties.followupReport
      + "/" + this.mentorId + "/" + this.programId
    ).subscribe(followupReport => {
      this.followupReport = followupReport as FollowupReport;
    });
  }

  onManageProgram(programId: number) {
    this.router.navigate([routeConstants.myPrograms, routeConstants.manageProgram, programId]);
}

}
