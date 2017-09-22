import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { CaptureContactComponent } from './capture-contact.component';
import { CapturedListComponent } from './captured-list.component'

const routes: Routes = [
  { path: routeConstants.captureContact, component: CaptureContactComponent },
  { path: routeConstants.capturedList, component: CapturedListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CaptureRoutingModule { }