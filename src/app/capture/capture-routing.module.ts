import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaptureContactComponent } from './capture-contact.component';
import { CapturedListComponent } from './captured-list.component'

const routes: Routes = [
  { path: 'capture-contact', component: CaptureContactComponent },
  { path: 'captured-list', component: CapturedListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CaptureRoutingModule { }