import { Component, OnInit, Input } from '@angular/core';

import { HttpService } from '../../shared/http.service';
import { connectionProperties } from '../../shared/app-properties';

import { AttendanceReport } from '../../model/attendance-report.model';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
})
export class AttendanceReportComponent implements OnInit {

  @Input() programId: number;

  attendanceReport: AttendanceReport;
  attendanceReportTable: string[][];

  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit() {
    this.attendanceReport = new AttendanceReport();
    this.attendanceReport.programName = "";
    this.attendanceReport.columnNames = [];
    this.attendanceReport.reportRows = [];

    if (this.programId != undefined) {
      this.httpService.getData(connectionProperties.attendanceReport + "/" + this.programId)
      .subscribe(reportData => {
        let attendanceReport = reportData as AttendanceReport;
        attendanceReport.reportRows = attendanceReport.reportRows.slice(0,4);
        this.attendanceReport = attendanceReport;
      });
    }
  }

}
