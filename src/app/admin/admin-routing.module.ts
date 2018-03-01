import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicAuthGuardService } from '../login/basic-auth-gaurd.service';

import { routeConstants } from '../shared/app-properties';
import { YatraAdminHolderComponent } from './yatra-admin-holder.component';
import { YatraComponent } from './yatra.component';
import { CreateYatraComponent } from './create-yatra.component';

import { SuperAdminHolderComponent } from './super-admin-holder.component';
import { SuperAdminComponent } from './super-admin.component';
import { YatraListComponent } from './yatra-list.component';
import { CreateProgramComponent } from './create-program.component';
import { ListProgramComponent } from './list-program.component';

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
        component:  YatraAdminHolderComponent,
        canActivate: [BasicAuthGuardService],
        children: [
            { 
                path: routeConstants.createProgram + '/:' + routeConstants.paramsYatraId, 
                component: CreateProgramComponent,
                canActivate: [BasicAuthGuardService],
            },
            { 
                path: routeConstants.editProgram + '/:' + routeConstants.paramsYatraId + '/:' + routeConstants.paramsProgramId, 
                component: CreateProgramComponent,
                canActivate: [BasicAuthGuardService],
            },
            { 
                path: routeConstants.listProgram + '/:' + routeConstants.paramsYatraId, 
                component: ListProgramComponent,
                canActivate: [BasicAuthGuardService],
            },
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