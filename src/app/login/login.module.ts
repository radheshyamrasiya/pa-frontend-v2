import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

import { LoginRoutingModule } from './login-routing.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        BrowserModule,
        LoginRoutingModule,
    ],
    exports: [
        LoginComponent,
    ],
    declarations: [
        LoginComponent,
        LandingPageComponent,
    ],
    providers: [
    ],
})

export class LoginModule { }