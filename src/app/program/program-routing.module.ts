import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { BasicAuthGuardService } from '../login/basic-auth-gaurd.service';

import { MyProgramsHolderComponent } from './my-programs-holder.component';
import { MyProgramsComponent } from './my-programs.component';
import { ManageProgramComponent } from './manage-program.component';
import { AddParticipantsComponent } from './add-participants.component';
import { AddFollowupVolunteersComponent } from './add-followup-volunteers.component';
import { AssignFollowupsComponent } from './assign-followups.component';
import { MarkAttendanceComponent } from './mark-attendance.component';
import { ManageSessionsComponent } from './manage-sessions.component';

import { DevoteeProfileComponent } from '../devotee/devotee-profile.component';
import { HistoryComponent } from '../devotee/history.component';
import { WriteCommentComponent } from '../devotee/write-comment.component';

const routes: Routes = [
  {
    path: routeConstants.myPrograms,
    component:  MyProgramsHolderComponent,
    canActivate: [BasicAuthGuardService],
    children: [
      {
        path: routeConstants.manageProgram + '/:' + routeConstants.paramsProgramId,
        component:  ManageProgramComponent,
        canActivate: [BasicAuthGuardService],
      },
      {
        path: routeConstants.manageSessions + '/:' + routeConstants.paramsProgramId,
        component:  ManageSessionsComponent,
        canActivate: [BasicAuthGuardService],
      },
      {
        path: routeConstants.addParticipants + '/:' + routeConstants.paramsProgramId,
        component:  AddParticipantsComponent,
        canActivate: [BasicAuthGuardService],
      },
      {
        path: routeConstants.addParticipants,
        canActivate: [BasicAuthGuardService],
        children: [
          { 
            path: routeConstants.devoteeProfile + '/:' + routeConstants.paramsProgramId + '/:' + routeConstants.paramDevoteeId, 
            component: DevoteeProfileComponent,
            canActivate: [BasicAuthGuardService],
          },
          { 
            path: routeConstants.history + '/:' + routeConstants.paramsProgramId + '/:' + routeConstants.paramDevoteeId, 
            component: HistoryComponent,
            canActivate: [BasicAuthGuardService],
          },
          { 
            path: routeConstants.writeComment + '/:' + routeConstants.paramsProgramId + '/:' + routeConstants.paramDevoteeId, 
            component: WriteCommentComponent,
            canActivate: [BasicAuthGuardService],
          },
        ]
      },
      {
        path: routeConstants.addFollowupVolunteers + '/:' + routeConstants.paramsProgramId,
        component:  AddFollowupVolunteersComponent,
        canActivate: [BasicAuthGuardService],
      },
      {
        path: routeConstants.assignFollowups + '/:' + routeConstants.paramsProgramId,
        component:  AssignFollowupsComponent,
        canActivate: [BasicAuthGuardService],
      },
      {
        path: routeConstants.markAttendance + '/:' + routeConstants.paramsProgramId,
        component:  MarkAttendanceComponent,
        canActivate: [BasicAuthGuardService],
      },
      {
        path: '',
        component:  MyProgramsComponent,
        canActivate: [BasicAuthGuardService],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProgramRoutingModule { }