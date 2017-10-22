import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../shared/http.service';
import { connectionProperties, statusType } from '../shared/app-properties';
import { StatusService } from '../shared/status.service';

@Injectable()
export class EnumService {
    enums;

    constructor(
        private httpService: HttpService,
        private statusService: StatusService,
    ) { }

    loadEnums() {
        this.httpService.get(connectionProperties.enums)
        .subscribe(response => {
            this.enums = JSON.parse(response._body);
        }, err => {
            this.statusService.setFlag("Critical Error Forms may not load", statusType.error);
        });
    }
}