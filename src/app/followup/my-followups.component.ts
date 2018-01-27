import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DevoteeMin } from '../model/devotee.model';
import { routeConstants } from '../shared/app-properties';

@Component ({
    selector: "my-followups",
    templateUrl: "./my-followups.component.html",
})

export class MyFollowupsComponent implements OnInit {
    devoteeList: DevoteeMin[];
    selectedProgramId: number;
    @Input() form: FormGroup;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            //this.devoteeList = this.followSession.getDevoteeList(+params[routeConstants.paramsProgramId]);
            this.selectedProgramId = +params[routeConstants.paramsProgramId];
        });
    }

    onPhoneClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup,routeConstants.callResponse,this.selectedProgramId, devoteeId]);
        //this.followSession.setCurrentFollowupDevotee(+devoteeId);
    }

    onHistoryClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup, routeConstants.history, this.selectedProgramId, devoteeId]);
        //this.followSession.setCurrentFollowupDevotee(+devoteeId);
    }

    onProfileClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup, routeConstants.devoteeProfile, this.selectedProgramId, devoteeId]);
        //this.followSession.setCurrentFollowupDevotee(+devoteeId);
    }

    onCommentClick(devoteeId: string): void {
        this.router.navigate([routeConstants.followup, routeConstants.writeComment, this.selectedProgramId, devoteeId]);
        //this.followSession.setCurrentFollowupDevotee(+devoteeId);
    }
}