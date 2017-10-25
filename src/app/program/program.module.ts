import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MyProgramsHolderComponent } from './my-programs-holder.component';
import { MyProgramsComponent } from './my-programs.component';
import { ManageProgramComponent } from './manage-program.component';

import { ProgramRoutingModule } from './program-routing.module';

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        BrowserModule,
        ProgramRoutingModule,
    ],
    exports: [],
    declarations: [
        MyProgramsHolderComponent,
        MyProgramsComponent,
        ManageProgramComponent,
    ],
    providers: [],
})

export class ProgramModule { }