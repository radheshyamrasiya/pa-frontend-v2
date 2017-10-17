import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicAuthGuardService } from '../login/basic-auth-gaurd.service';

import { routeConstants } from '../shared/app-properties';
import { CapturedListHolderComponent } from './captured-list-holder.component';
import { CaptureContactComponent } from './capture-contact.component';
import { CapturedListComponent } from './captured-list.component'

import { DevoteeProfileComponent } from '../devotee/devotee-profile.component';
import { HistoryComponent } from '../devotee/history.component';
import { WriteCommentComponent } from '../devotee/write-comment.component';

const routes: Routes = [
  { 
    path: routeConstants.captureContact,
    component: CaptureContactComponent,
    canActivate: [BasicAuthGuardService], 
  },
  { 
    path: routeConstants.capturedList,
    component: CapturedListHolderComponent,
    canActivate: [BasicAuthGuardService],
    children: [
      { 
        path: routeConstants.devoteeProfile + '/:' + routeConstants.paramDevoteeId, 
        component: DevoteeProfileComponent,
        canActivate: [BasicAuthGuardService],
      },
      { 
        path: routeConstants.history + '/:' + routeConstants.paramDevoteeId, 
        component: HistoryComponent,
        canActivate: [BasicAuthGuardService],
      },
      { 
        path: routeConstants.writeComment + '/:' + routeConstants.paramDevoteeId, 
        component: WriteCommentComponent,
        canActivate: [BasicAuthGuardService],
      },
      { 
        path: '', 
        component: CapturedListComponent,
        canActivate: [BasicAuthGuardService],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CaptureRoutingModule { }