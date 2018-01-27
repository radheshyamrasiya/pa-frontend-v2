import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

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
    ],
})

export class LoginModule { }