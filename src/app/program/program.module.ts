import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MyProgramsHolderComponent } from './my-programs-holder.component';
import { MyProgramsComponent } from './my-programs.component';
import { ManageProgramComponent } from './manage-program.component';
import { AddParticipantsComponent } from './add-participants.component';
import { AddFollowupVolunteersComponent } from './add-followup-volunteers.component';
import { AssignFollowupsComponent } from './assign-followups.component';
import { MarkAttendanceComponent } from './mark-attendance.component';

import { ProgramRoutingModule } from './program-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManageSessionsComponent } from './manage-sessions.component';


@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        BrowserModule,
        ProgramRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        MyProgramsHolderComponent,
        MyProgramsComponent,
        ManageProgramComponent,
        AddParticipantsComponent,
        AddFollowupVolunteersComponent,
        AssignFollowupsComponent,
        MarkAttendanceComponent,
        ManageSessionsComponent,
    ],
    providers: [],
})

export class ProgramModule { }