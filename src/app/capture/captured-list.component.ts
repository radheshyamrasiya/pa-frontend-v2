import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Devotee } from '../model/devotee.model';

import { FollowupSessionService } from '../core/followup-session.service';

@Component ({
    selector: 'captured-list',
    templateUrl: './captured-list.component.html',
})

export class CapturedListComponent implements OnInit {
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

    onHistoryClick(devoteeId: string): void {
        this.router.navigate(['/history']);
        this.followSession.setCurrentFollowupDevotee(+devoteeId);
    }

    onProfileClick(devoteeId: string): void {
        this.router.navigate(['/devotee-profile']);
        this.followSession.setCurrentFollowupDevotee(+devoteeId);
    }

    onCommentClick(devoteeId: string): void {
        this.router.navigate(['/write-comment']);
        this.followSession.setCurrentFollowupDevotee(+devoteeId);
    }
}