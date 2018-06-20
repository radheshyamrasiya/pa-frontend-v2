import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DevoteeSearchComponent } from './devotee-search/devotee-search.component';
import { DevoteeDisplayComponent } from './devotee-display/devotee-display.component';

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        BrowserModule,
    ],
    exports: [
        DevoteeSearchComponent,
        DevoteeDisplayComponent,
    ],
    declarations: [
        DevoteeSearchComponent,
        DevoteeDisplayComponent,
    ],
    providers: [
    ],
})

export class SharedModule { }