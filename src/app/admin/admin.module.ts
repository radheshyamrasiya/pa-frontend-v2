import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AdminRoutingModule } from './admin-routing.module';

import { YatraAdminHolderComponent } from './yatra-admin-holder.component';
import { YatraComponent } from './yatra.component';
import { CreateYatraComponent } from './create-yatra.component';
import { SuperAdminComponent } from './super-admin.component';
import { SuperAdminHolderComponent } from './super-admin-holder.component';
import { YatraListComponent } from './yatra-list.component';
import { CreateProgramComponent } from './create-program.component';
import { ListProgramComponent } from './list-program.component';

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        BrowserModule,
        AdminRoutingModule,
    ],
    exports: [],
    declarations: [
        //Super Admin
        SuperAdminHolderComponent,
        SuperAdminComponent,
        CreateYatraComponent,
        YatraListComponent,
        //Yatra Admin
        YatraAdminHolderComponent,
        YatraComponent,
        CreateProgramComponent,
        ListProgramComponent,
    ],
    providers: [],
})
export class AdminModule { }
