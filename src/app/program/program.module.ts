import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyProgramsComponent } from './my-programs.component';

import { ProgramRoutingModule } from './program-routing.module';

@NgModule({
    imports: [
        NgbModule,
        ProgramRoutingModule,
    ],
    exports: [],
    declarations: [
        MyProgramsComponent,
    ],
    providers: [],
})

export class ProgramModule { }