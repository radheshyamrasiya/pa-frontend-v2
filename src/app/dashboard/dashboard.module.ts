import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { BasicAuthGuardService } from '../login/basic-auth-gaurd.service';

const appRoutes: Routes = [
  { 
      path: 'dashboard', 
      component: DashboardComponent,
      canActivate: [BasicAuthGuardService],
    },
];

@NgModule({
    imports: [
        NgbModule,
        RouterModule.forChild(appRoutes),
    ],
    exports: [],
    declarations: [
        DashboardComponent,
    ],
    providers: [],
})

export class DashboardModule { }