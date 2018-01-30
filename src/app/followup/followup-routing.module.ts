import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { BasicAuthGuardService } from '../login/basic-auth-gaurd.service';

import { FollowupComponent } from './followup.component';
import { CallResponseComponent } from './call-response.component';
import { MyFollowupsComponent } from './my-followups.component';
import { MyFollowupProgramsComponent } from './my-followup-programs.component';

import { WriteCommentComponent } from '../devotee/write-comment.component';
import { HistoryComponent } from '../devotee/history.component';
import { DevoteeProfileComponent } from '../devotee/devotee-profile.component';

const routes: Routes = [
  { 
    path: routeConstants.followup,
    component: FollowupComponent,
    canActivate: [BasicAuthGuardService],
    children: [
      { 
        path: routeConstants.followupProgram,
        component: MyFollowupProgramsComponent,
        canActivate: [BasicAuthGuardService],
      },
      { 
        path: routeConstants.followupProgram + '/:' + routeConstants.paramsProgramId,
        component: MyFollowupsComponent,
        canActivate: [BasicAuthGuardService],
      },
      { 
        path: routeConstants.callResponse + '/:' + routeConstants.paramsProgramId + '/:' + routeConstants.paramDevoteeId,
        component: CallResponseComponent,
        canActivate: [BasicAuthGuardService],
      },
      {
        path: routeConstants.writeComment  + '/:' + routeConstants.paramsProgramId + '/:' + routeConstants.paramDevoteeId,
        component: WriteCommentComponent,
        canActivate: [BasicAuthGuardService],
      },
      {
        path: routeConstants.history  + '/:' + routeConstants.paramsProgramId + '/:' + routeConstants.paramDevoteeId,
        component: HistoryComponent,
        canActivate: [BasicAuthGuardService],
      },
      {
        path: routeConstants.devoteeProfile  + '/:' + routeConstants.paramsProgramId + '/:' + routeConstants.paramDevoteeId,
        component: DevoteeProfileComponent,
        canActivate: [BasicAuthGuardService],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FollowupRoutingModule { }