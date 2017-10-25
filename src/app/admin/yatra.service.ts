import { Injectable, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { HttpService } from '../shared/http.service';
import { connectionProperties, statusType, dbRequestPageSize } from '../shared/app-properties';
import { StatusService } from '../shared/status.service';

import { Yatra, YatraPage } from '../model/yatra.model';

@Injectable()
export class YatraService implements OnInit {
    pageNumber: number;

    constructor(
        private statusService: StatusService,
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        this.pageNumber = 0;
    }

    loadYatraList(page: number, adminId?: number): Observable<YatraPage> {
        let params = "?page=" + page + "&size=" + dbRequestPageSize;
        this.pageNumber = page;
        
        let queryUrl = connectionProperties.listYatra;
        if (adminId != undefined) {
            queryUrl = connectionProperties.listYatraByAdmin + "/" + adminId;
        }
        let yatraPage = new YatraPage();
        return Observable.create(observer => {
            this.httpService
            .get(queryUrl + params)
            .subscribe(response => {
                let responseYatra = JSON.parse(response._body);
                yatraPage.yatraList = responseYatra.data;
                yatraPage.paging = responseYatra.paging;
                observer.next(yatraPage);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error loading List", statusType.error);
            });
        });
    }

    loadYatra(yatraId: number): Observable<Yatra> {
        return Observable.create(observer => {
            this.httpService
            .get(connectionProperties.getYatra + '/' + yatraId)
            .subscribe(response => {
                let responseYatra = JSON.parse(response._body);
                observer.next(responseYatra.data);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error loading yatra", statusType.error);
            });
        });
    }

    createYatra(yatra: Yatra): Observable<Yatra> {
        return Observable.create(observer => {
            this.httpService
            .post(connectionProperties.createYatra, yatra)
            .subscribe(response => {
                let responseYatra = JSON.parse(response._body);
                observer.next(responseYatra);
                this.statusService.setFlag("Yatra Created", statusType.success);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error registering yatra", statusType.error);
            });
        });
    }

    updateYatra(yatra: Yatra): Observable<Yatra> {
        return Observable.create(observer => {
            this.httpService
            .put(connectionProperties.updateYatra + '/' + yatra.id, yatra)
            .subscribe(response => {
                let responseYatra = JSON.parse(response._body);
                observer.next(responseYatra);
                this.statusService.setFlag("Yatra Updated", statusType.success);
                observer.complete();
            }, err => {
                this.statusService.setFlag("Error updating yatra", statusType.error);
            });
        });
    }
}