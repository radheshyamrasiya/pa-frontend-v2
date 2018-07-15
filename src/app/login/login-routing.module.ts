import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routeConstants } from '../shared/app-properties';
import { LoginComponent } from './login.component';
import { LandingPageComponent } from './landing-page.component';

const routes: Routes = [
  { path: routeConstants.login, component: LoginComponent },
  { path: routeConstants.welcome, component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LoginRoutingModule { }