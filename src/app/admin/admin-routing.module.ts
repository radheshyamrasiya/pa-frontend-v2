import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicAuthGuardService } from '../login/basic-auth-gaurd.service';

import { routeConstants } from '../shared/app-properties';
import { YatraHolderComponent } from './yatra-holder.component';
import { YatraComponent } from './yatra.component';
import { CreateYatraComponent } from './create-yatra.component';

import { SuperAdminHolderComponent } from './super-admin-holder.component';
import { SuperAdminComponent } from './super-admin.component';
import { YatraListComponent } from './yatra-list.component';

const routes: Routes = [
    {
        path: routeConstants.superAdmin,
        component:  SuperAdminHolderComponent,
        canActivate: [BasicAuthGuardService],
        children: [
            {
                path: routeConstants.createYatra,
                component:  CreateYatraComponent,
                canActivate: [BasicAuthGuardService],
            },
            {
                path: routeConstants.createYatra + '/:' + routeConstants.paramsYatraId,
                component:  CreateYatraComponent,
                canActivate: [BasicAuthGuardService],
            },
            {
                path: routeConstants.listYatra,
                component:  YatraListComponent,
                canActivate: [BasicAuthGuardService],
            },
            {
                path: '',
                component: SuperAdminComponent,
                canActivate: [BasicAuthGuardService],
            }
        ],
    },
    { 
        path: routeConstants.yatra,
        component:  YatraHolderComponent,
        canActivate: [BasicAuthGuardService],
        children: [
            { 
                path: '', 
                component: YatraComponent,
                canActivate: [BasicAuthGuardService],
            },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule { }