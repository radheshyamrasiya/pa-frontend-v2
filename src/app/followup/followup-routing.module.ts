import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
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
    children: [
      { 
        path: routeConstants.followupProgram,
        component: MyFollowupProgramsComponent,
      },
      { 
        path: routeConstants.followupProgram + '/:' + routeConstants.paramsProgramId,
        component: MyFollowupsComponent,
      },
      { 
        path: routeConstants.callResponse + '/:' + routeConstants.paramsProgramId + '/:' + routeConstants.paramDevoteeId,
        component: CallResponseComponent,
      },
      {
        path: routeConstants.writeComment  + '/:' + routeConstants.paramsProgramId + '/:' + routeConstants.paramDevoteeId,
        component: WriteCommentComponent,
      },
      {
        path: routeConstants.history  + '/:' + routeConstants.paramsProgramId + '/:' + routeConstants.paramDevoteeId,
        component: HistoryComponent,
      },
      {
        path: routeConstants.devoteeProfile  + '/:' + routeConstants.paramsProgramId + '/:' + routeConstants.paramDevoteeId,
        component: DevoteeProfileComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FollowupRoutingModule { }