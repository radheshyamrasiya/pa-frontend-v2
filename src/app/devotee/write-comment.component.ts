import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { routeConstants } from '../shared/app-properties';
import { DevoteeMin } from '../model/devotee.model';
import { FollowupSessionService } from "../followup/followup-session.service";

@Component ({
    selector: 'write-comment',
    templateUrl: './write-comment.component.html',
})

export class WriteCommentComponent implements OnInit {
    selected = 0;
    devotee: DevoteeMin;

    constructor(
        private router: Router,
        private followupService: FollowupSessionService,
    ) {};

    ngOnInit() {
        if (this.followupService.getCurrentFollowupDevotee()) {
            this.devotee = this.followupService.getCurrentFollowupDevotee();
        } else {
            this.router.navigate([routeConstants.dashboard]);
        }
    }

    onSaveClick() {
        this.router.navigate(['../']);
    }
}