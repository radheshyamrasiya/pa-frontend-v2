import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevoteeProfileComponent } from './devotee-profile.component';
import { HistoryComponent } from './history.component'
import { WriteCommentComponent } from './write-comment.component'

const routes: Routes = [
  { path: 'devotee-profile', component: DevoteeProfileComponent },
  { path: 'history', component: HistoryComponent},
  { path: 'write-comment', component: WriteCommentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DevoteeRoutingModule { }