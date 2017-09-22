import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routeConstants } from './shared/app-properties';
import { BasicAuthGuardService } from './login/basic-auth-gaurd.service';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: routeConstants.dashboard, 
    canActivate: [BasicAuthGuardService],
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}