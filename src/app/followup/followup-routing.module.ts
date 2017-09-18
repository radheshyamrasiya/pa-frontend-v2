import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallResponseComponent } from './call-response.component';
import { MyFollowupsComponent } from './my-followups.component'

const routes: Routes = [
  { path: 'call-response', component: CallResponseComponent },
  { path: 'my-followups', component: MyFollowupsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FollowupRoutingModule { }