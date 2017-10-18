import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DevoteeMin } from '../model/devotee.model';

import { CaptureSessionService } from './capture-session.service';
import { routeConstants } from '../shared/app-properties';

@Component ({
    selector: 'captured-list',
    templateUrl: './captured-list.component.html',
})

export class CapturedListComponent implements OnInit {
    devoteeList: DevoteeMin[];
    activePanel: string;
    @Input() form: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private captureSession: CaptureSessionService,
    ) {}

    ngOnInit() {
        this.activePanel = "";
        this.devoteeList = this.captureSession.captureDevoteeList;
        
        this.route.queryParams.subscribe(params => {
            if(params["id"]) {
                this.activePanel = params["id"] + "_id";
            }
        });
    }

    onPhoneClick(devoteeId: string): void {
        this.router.navigate([routeConstants.writeComment, devoteeId], {relativeTo: this.route});
        this.captureSession.setCurrentCaptureDevotee(+devoteeId);
    }

    onHistoryClick(devoteeId: string): void {
        this.router.navigate([routeConstants.history, devoteeId], {relativeTo: this.route});
        this.captureSession.setCurrentCaptureDevotee(+devoteeId);
    }

    onProfileClick(devoteeId: string): void {
        this.router.navigate([routeConstants.devoteeProfile, devoteeId], {relativeTo: this.route});
        this.captureSession.setCurrentCaptureDevotee(+devoteeId);
    }

    onCommentClick(devoteeId: string): void {
        this.router.navigate([routeConstants.writeComment, devoteeId], {relativeTo: this.route});
        this.captureSession.setCurrentCaptureDevotee(+devoteeId);
    }
}