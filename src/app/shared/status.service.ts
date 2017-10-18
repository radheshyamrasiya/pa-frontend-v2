import { Injectable, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { statusType, welcomeMessage, greeting } from './app-properties';

@Injectable()
export class StatusService implements OnInit {
    message: string;
    status: string;
    timestamp: number;

    defaultMessage: string;
    defaultStatus: string;

    constructor() { }

    ngOnInit() {
        
    }

    setFlag(message: string, status: string) {
        this.message = message;
        this.status = status;
        this.timestamp = Date.now();
        
        Observable.of(this.timestamp).delay(3000)
        .subscribe(ts => {
            if (ts==this.timestamp) {
                this.message = this.defaultMessage;
                this.status = this.defaultStatus;
            }
        });
    }

    setDefaultFlag(devoteeName: string) {
        this.defaultMessage = greeting + devoteeName;
        this.defaultStatus = statusType.info;

        this.message = this.defaultMessage;
        this.status = this.defaultStatus;
    }

    resetDefaultFlag() {
        this.defaultMessage = welcomeMessage;
        this.defaultStatus = statusType.info;

        this.message = this.defaultMessage;
        this.status = this.defaultStatus;
    }
}