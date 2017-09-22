import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { DevoteeProfileComponent } from './devotee-profile.component';
import { HistoryComponent } from './history.component'
import { WriteCommentComponent } from './write-comment.component'

const routes: Routes = [
  { path: routeConstants.devoteeProfile, component: DevoteeProfileComponent },
  { path: routeConstants.history, component: HistoryComponent},
  { path: routeConstants.writeComment, component: WriteCommentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DevoteeRoutingModule { }