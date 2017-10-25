import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { BasicAuthGuardService } from '../login/basic-auth-gaurd.service';

import { MyProgramsHolderComponent } from './my-programs-holder.component';
import { MyProgramsComponent } from './my-programs.component';
import { ManageProgramComponent } from './manage-program.component';

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