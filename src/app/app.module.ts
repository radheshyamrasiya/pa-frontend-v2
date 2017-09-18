import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl,FormGroup } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CaptureModule } from './capture/capture.module';
import { DevoteeModule } from './devotee/devotee.module';
import { ProgramModule } from './program/program.module';
import { FollowupModule } from './followup/followup.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    //Our Modules
    CoreModule,
    SharedModule,
    LoginModule,
    DashboardModule,
    CaptureModule,
    DevoteeModule,
    ProgramModule,
    FollowupModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }