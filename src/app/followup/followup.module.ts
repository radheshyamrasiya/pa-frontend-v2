import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { FollowupSessionService } from './followup-session.service';
import { CallResponseComponent } from './call-response.component';
import { FollowupComponent } from './followup.component';
import { MyFollowupsComponent } from './my-followups.component'
import { MyFollowupProgramsComponent } from './my-followup-programs.component';

import { FollowupRoutingModule } from './followup-routing.module';

@NgModule({
    imports: [
        NgbModule,
        BrowserModule,
        FollowupRoutingModule,
    ],
    exports: [],
    declarations: [
        FollowupComponent,
        CallResponseComponent,
        MyFollowupsComponent,
        MyFollowupProgramsComponent,
    ],
    providers: [],
})

export class FollowupModule { }