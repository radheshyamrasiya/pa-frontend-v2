import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { FollowupReportComponent } from './followup-report/followup-report.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        BrowserModule,
    ],
    exports: [
        FollowupReportComponent,
        AttendanceReportComponent,
    ],
    declarations: [
        FollowupReportComponent,
        AttendanceReportComponent,
    ],
    providers: [
    ],
})

export class ReportsModule { }