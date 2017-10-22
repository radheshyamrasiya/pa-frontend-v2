import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CaptureContactComponent } from './capture-contact.component';
import { CapturedListComponent } from './captured-list.component';
import { CapturedListHolderComponent } from './captured-list-holder.component';

import { CaptureRoutingModule } from './capture-routing.module';

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        BrowserModule,
        CaptureRoutingModule,
    ],
    exports: [],
    declarations: [
        CaptureContactComponent,
        CapturedListComponent,
        CapturedListHolderComponent,
    ],
    providers: [
        
    ],
})
export class CaptureModule { }
