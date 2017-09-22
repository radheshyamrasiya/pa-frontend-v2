import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { MyProgramsComponent } from './my-programs.component';

const routes: Routes = [
  { path: routeConstants.myPrograms, component: MyProgramsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProgramRoutingModule { }