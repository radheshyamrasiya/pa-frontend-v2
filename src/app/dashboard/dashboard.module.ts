import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
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