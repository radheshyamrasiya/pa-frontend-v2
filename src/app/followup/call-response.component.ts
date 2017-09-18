import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { callResponse } from '../shared/app-properties';
import { Devotee } from '../model/devotee.model';

import { FollowupSessionService } from '../core/followup-session.service';

@Component ({
    selector: 'call-response',
    templateUrl: './call-response.component.html',
})

export class CallResponseComponent implements OnInit {
    callResponse;
    response: string;
    followupDevotee: Devotee;

    constructor(
        private router: Router,
        private followupSession: FollowupSessionService,
    ) {}

    ngOnInit() {
        this.followupDevotee = this.followupSession.getCurrentFollowupDevotee();
        if (!this.followupDevotee) {
            this.router.navigate(['/dashboard']);
        }
        this.callResponse = callResponse;
        this.response="";
    }

    onSaveClick() {
        this.router.navigate(['/write-comment']);
    }
}