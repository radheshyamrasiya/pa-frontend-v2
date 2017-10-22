import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Yatra, YatraPage } from '../model/yatra.model';
import { Paging } from '../model/paging.model';
import { YatraService } from './yatra.service';
import { routeConstants } from '../shared/app-properties';

@Component({
    selector: 'yatra-list-component',
    templateUrl: 'yatra-list.component.html'
})

export class YatraListComponent implements OnInit {

    contents: YatraPage;

    constructor(
        private yatraService: YatraService,
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
            page = this.yatraService.pageNumber;
        }
        this.yatraService.loadYatraList(page)
        .subscribe(contents => {
            this.contents = contents;
        });
    }
}