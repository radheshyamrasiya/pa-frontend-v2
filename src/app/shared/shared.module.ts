import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpService } from './http.service';


@NgModule({
    imports: [
        NgbModule,
    ],
    exports: [],
    declarations: [],
    providers: [
        HttpService,
    ],
})

export class SharedModule { }