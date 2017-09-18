import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Devotee } from '../model/devotee.model';

import { FollowupSessionService } from '../core/followup-session.service';

@Component ({
    selector: "my-followups",
    templateUrl: "./my-followups.component.html",
})

export class MyFollowupsComponent implements OnInit {
    devoteeList: Devotee[];
    @Input() form: FormGroup;

    constructor(
        private router: Router,
        private followSession: FollowupSessionService,
    ) {}

    ngOnInit() {
        this.devoteeList = this.followSession.followupDevoteeList;
    }

    onPhoneClick(devoteeId: string): void {
        this.router.navigate(['/call-response']);
        this.followSession.setCurrentFollowupDevotee(+devoteeId);
    }
}