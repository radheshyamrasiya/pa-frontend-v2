import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { CallResponseComponent } from './call-response.component';
import { MyFollowupsComponent } from './my-followups.component'

import { FollowupRoutingModule } from './followup-routing.module';

@NgModule({
    imports: [
        NgbModule,
        BrowserModule,
        FollowupRoutingModule,
    ],
    exports: [],
    declarations: [
        CallResponseComponent,
        MyFollowupsComponent,
    ],
    providers: [],
})

export class FollowupModule { }