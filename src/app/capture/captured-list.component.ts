import { Component, Input, OnInit } from  '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CaptureContact, CaptureContactPage } from '../model/capture-contact.model';
import { Paging } from '../model/entity.model';

import { HttpService } from '../shared/http.service';
import { LoginSessionService } from '../login/login-session.service';
import { routeConstants, connectionProperties } from '../shared/app-properties';
import { NavService } from '../shared/nav.service';

@Component ({
    selector: 'captured-list',
    templateUrl: './captured-list.component.html',
})

export class CapturedListComponent implements OnInit {
    contents: CaptureContactPage;
    activePanel: string;
    @Input() form: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private httpService: HttpService,
        private loginService: LoginSessionService,
        private navService: NavService,
    ) {}

    ngOnInit() {
        this.activePanel = "";
        this.contents = new CaptureContactPage();
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
            let pageNum = this.navService.getNum("myCapturedListPageNo");
            (pageNum==null)?page=0:page=pageNum;
        } else {
            this.navService.setNum("myCapturedListPageNo", page);
        }
        this.httpService.getList(
            connectionProperties.myCapturedListUrl,
            {
                pathParams: "/" + this.loginService.getDevoteeId(),
                page: page,
                sortString: "timestamp,desc"
            }
        ).subscribe(contents => {
            this.contents = contents;
        });
    }

    onBackClick() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }
}