import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StatusAlertComponent } from './status-alert/status-alert.component';

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        BrowserModule,
    ],
    exports: [
        StatusAlertComponent,
    ],
    declarations: [
        StatusAlertComponent,
    ],
    providers: [
    ],
})

export class UtilsModule { }