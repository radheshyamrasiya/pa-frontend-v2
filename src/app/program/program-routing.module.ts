import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProgramsComponent } from './my-programs.component';

const routes: Routes = [
  { path: 'my-programs', component: MyProgramsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProgramRoutingModule { }