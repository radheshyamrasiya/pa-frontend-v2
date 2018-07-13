import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ChangePasswordComponent } from './change-password.component';

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        BrowserModule,
        UserRoutingModule,
    ],
    exports: [],
    declarations: [
        UserComponent,
        ChangePasswordComponent,
    ],
    providers: [],
})

export class UserModule { }