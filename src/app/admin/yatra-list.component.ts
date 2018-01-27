import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Yatra, YatraPage } from '../model/yatra.model';
import { Paging } from '../model/entity.model';
import { HttpService } from '../shared/http.service';
import { routeConstants, connectionProperties } from '../shared/app-properties';
import { NavService } from '../shared/nav.service';

@Component({
    selector: 'yatra-list-component',
    templateUrl: 'yatra-list.component.html'
})

export class YatraListComponent implements OnInit {

    contents: YatraPage;

    constructor(
        private httpService: HttpService,
        private navService: NavService,
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

    onYatraUpdate(yatraId: number) {
        this.router.navigate([routeConstants.superAdmin, routeConstants.createYatra, yatraId]);
    }

    onBackClick() {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }

    loadContents(page?: number) {
        if(page == undefined) {
            let pageNum = this.navService.getNum("yatraListPageNo");
            (pageNum==null)?page=0:page=pageNum;
        } else {
            this.navService.setNum("yatraListPageNo", page);
        }
        this.httpService.getList(
            connectionProperties.listYatra,
            {
                page: page
            }
        )
        .subscribe(contents => {
            this.contents = contents;
        });
    }
}