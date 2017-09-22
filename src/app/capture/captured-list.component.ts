import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { DevoteeMin } from '../model/devotee.model';

import { CaptureSessionService } from './capture-session.service';
import { routeConstants } from '../shared/app-properties';

@Component ({
    selector: 'captured-list',
    templateUrl: './captured-list.component.html',
})

export class CapturedListComponent implements OnInit {
    devoteeList: DevoteeMin[];
    @Input() form: FormGroup;

    constructor(
        private router: Router,
        private captureSession: CaptureSessionService,
    ) {}

    ngOnInit() {
        this.devoteeList = this.captureSession.captureDevoteeList;
    }

    onPhoneClick(devoteeId: string): void {
        this.router.navigate([routeConstants.writeComment, devoteeId]);
        this.captureSession.setCurrentCaptureDevotee(+devoteeId);
    }

    onHistoryClick(devoteeId: string): void {
        this.router.navigate([routeConstants.history, devoteeId]);
        this.captureSession.setCurrentCaptureDevotee(+devoteeId);
    }

    onProfileClick(devoteeId: string): void {
        this.router.navigate([routeConstants.devoteeProfile, devoteeId]);
        this.captureSession.setCurrentCaptureDevotee(+devoteeId);
    }

    onCommentClick(devoteeId: string): void {
        this.router.navigate([routeConstants.writeComment, devoteeId]);
        this.captureSession.setCurrentCaptureDevotee(+devoteeId);
    }
}