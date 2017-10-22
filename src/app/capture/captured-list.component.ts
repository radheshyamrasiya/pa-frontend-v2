import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DevoteeMin, DevoteeMinPage, Devotee } from '../model/devotee.model';
import { Paging } from '../model/paging.model';

import { CaptureSessionService } from './capture-session.service';
import { LoginSessionService } from '../login/login-session.service';
import { routeConstants } from '../shared/app-properties';

@Component ({
    selector: 'captured-list',
    templateUrl: './captured-list.component.html',
})

export class CapturedListComponent implements OnInit {
    contents: DevoteeMinPage;
    activePanel: string;
    @Input() form: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private captureSession: CaptureSessionService,
        private loginService: LoginSessionService,
    ) {}

    ngOnInit() {
        this.activePanel = "";
        this.contents = new DevoteeMinPage();
        this.contents.paging = new Paging();
        this.contents.paging.first = true;
        this.contents.paging.last = true;

        this.route.queryParams.subscribe(params => {
            if (params["id"]) 
                this.activePanel = params["id"] + "_id";
        });
        this.loadContents();
    }

    onPhoneClick(devoteeId: string): void {
        this.router.navigate([routeConstants.writeComment, devoteeId], {relativeTo: this.route});
    }

    onHistoryClick(devoteeId: string): void {
        this.router.navigate([routeConstants.history, devoteeId], {relativeTo: this.route});
    }

    onProfileClick(devoteeId: string): void {
        this.router.navigate([routeConstants.devoteeProfile, devoteeId], {relativeTo: this.route});
    }

    onCommentClick(devoteeId: string): void {
        this.router.navigate([routeConstants.writeComment, devoteeId], {relativeTo: this.route});
    }
    
    loadContents(page?: number) {
        if(page == undefined) {
            page = this.captureSession.pageNumber;
        }
        this.captureSession.loadCaptureDevoteeList(
            this.loginService.getDevoteeId(),
            page,
        ).subscribe(contents => {
            this.contents = contents;
        });
    }

    onBackClick() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }
}