import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { FollowupReportComponent } from './followup-report/followup-report.component';

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        BrowserModule,
    ],
    exports: [
        FollowupReportComponent,
    ],
    declarations: [
        FollowupReportComponent,
    ],
    providers: [
    ],
})

export class ReportsModule { }