import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Yatra, YatraPage } from '../model/yatra.model';
import { Paging } from '../model/entity.model';
import { HttpService } from '../shared/http.service';
import { LoginSessionService } from '../login/login-session.service';
import { routeConstants, connectionProperties } from '../shared/app-properties';

@Component({
    selector: 'yatra-component',
    templateUrl: 'yatra.component.html'
})

export class YatraComponent implements OnInit {

    contents: YatraPage;

    constructor(
        private httpService: HttpService,
        private loginService: LoginSessionService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.contents = new YatraPage();
        this.contents.paging = new Paging();
        this.contents.paging.first = true;
        this.contents.paging.last = true;
        this.loadContents();
    }

    onCreateProgram(yatraId: number) {
        this.router.navigate([routeConstants.yatra, routeConstants.createProgram, yatraId]);
    }

    onBackClick() {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }

    loadContents(page?: number) {
        if(page == undefined) {
            page = 0;
        }
        this.httpService.getList(connectionProperties.listYatraByAdmin,{
            page: page,
            pathParams: "/" + this.loginService.getDevoteeId(),
        })
        .subscribe(contents => {
            this.contents = contents;
        });
    }
}