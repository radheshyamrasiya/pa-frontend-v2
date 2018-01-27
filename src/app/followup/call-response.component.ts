import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { callResponse } from '../shared/app-properties';
import { DevoteeMin } from '../model/devotee.model';

import { routeConstants } from '../shared/app-properties';

@Component ({
    selector: 'call-response',
    templateUrl: './call-response.component.html',
})

export class CallResponseComponent implements OnInit {
    callResponse;
    response: string;
    followupDevotee: DevoteeMin;

    constructor(
        private router: Router,
    ) {}

    ngOnInit() {
        //this.followupDevotee = this.followupSession.getCurrentFollowupDevotee();
        if (!this.followupDevotee) {
            this.router.navigate([routeConstants.dashboard]);
        }
        this.callResponse = callResponse;
        this.response="";
    }

    onSaveClick() {
        this.router.navigate([routeConstants.writeComment]);
    }
}