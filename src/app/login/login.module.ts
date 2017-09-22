import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { LoginSessionService } from './login-session.service';
import { FollowupSessionService } from '../followup/followup-session.service';
import { CaptureSessionService } from '../capture/capture-session.service';
import { BasicAuthGuardService } from './basic-auth-gaurd.service';
import { LoginComponent } from './login.component';

import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        LoginRoutingModule,
    ],
    exports: [],
    declarations: [
        LoginComponent,
    ],
    providers: [
        LoginSessionService,
        FollowupSessionService,
        CaptureSessionService,
        BasicAuthGuardService,
    ],
})

export class LoginModule { }