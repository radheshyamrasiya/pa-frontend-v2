import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FollowupSessionService } from './followup-session.service';
import { LoginSessionService } from './login-session.service';


@NgModule({
    imports: [
        NgbModule,
    ],
    exports: [],
    declarations: [],
    providers: [
        FollowupSessionService,
        LoginSessionService,
    ],
})

export class CoreModule { }