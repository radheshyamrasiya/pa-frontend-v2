import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Program, ProgramPage } from '../model/program.model';
import { Paging } from '../model/entity.model';
import { statusType, routeConstants, connectionProperties } from '../shared/app-properties';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';
import { EnumService } from '../shared/enum.service';
import { NavService } from '../shared/nav.service';

@Component({
    selector: 'list-program',
    templateUrl: 'list-program.component.html'
})

export class ListProgramComponent implements OnInit {
    yatraId: number;
    contents: ProgramPage;

    constructor(
        private httpService: HttpService,
        private statusService: StatusService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public enumService: EnumService,
        public navService: NavService,
    ) { }

    ngOnInit() {
        this.contents = new ProgramPage();
        this.contents.paging = new Paging();
        this.contents.paging.first = true;
        this.contents.paging.last = true;
        this.contents.dataList = [];

        this.activatedRoute.params.subscribe(params => {
            this.yatraId = +params[routeConstants.paramsYatraId];
            this.loadContents();
        });
    }

    onProgramUpdate(programId: number) {
        this.router.navigate([routeConstants.yatra, routeConstants.editProgram, this.yatraId, programId]);
    }

    onBackClick() {
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }

    loadContents(page?: number) {
        if(page == undefined) {
            let pageNum = this.navService.getNum("programListPageNo");
            (pageNum==null)?page=0:page=pageNum;
        } else {
            this.navService.setNum("programListPageNo", page);
        }
        this.httpService.getList(
            connectionProperties.listProgramByYatra,
            {
                page: page,
                pathParams: '/' + this.yatraId,
            }
        )
        .subscribe(contents => {
            this.contents = contents;
        });
    }
}