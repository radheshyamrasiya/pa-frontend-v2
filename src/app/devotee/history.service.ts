import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../shared/http.service';
import { connectionProperties, dbRequestPageSize } from '../shared/app-properties';
import { History, HistoryPage } from '../model/history.model';
import { HistoryRequestQuery, HistoryResponseQuery } from '../model-get/history-query.model';

@Injectable()
export class HistoryService implements OnInit {
    pageNumber: number;

    constructor(
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        this.pageNumber = 0;
    }

    writeComment(history: History): Observable<History> {
        let historyJson: HistoryRequestQuery;
        let historyReponseJson: HistoryResponseQuery;

        historyJson = this.mapHistoryToJson(history);
        return Observable.create(observer => {
            this.httpService.post(connectionProperties.writeHistory, historyJson)
            .subscribe(res => {
                let rawHistory = JSON.parse(res._body);
                historyReponseJson = rawHistory; //There is no .data in this response ??
                history = this.mapJsonToHistory(historyReponseJson);
                observer.next(history);
                observer.complete();
            }, err => {
                observer.throw(err);
                observer.complete();
            });
        });
    }

    loadHistory(devoteeId: number, page: number): Observable<HistoryPage> {
        let historyPage: HistoryPage;

        historyPage = new HistoryPage();
        let params = "?page=" + page + "&size=" + dbRequestPageSize + "&sort=timeStamp,desc";
        this.pageNumber = page;
        return Observable.create(observer => {
            this.httpService.get(connectionProperties.historyOf + '/' + devoteeId + params)
            .subscribe(res => {
                let rawHistory = JSON.parse(res._body);
                historyPage.historyList = rawHistory.data;
                historyPage.paging = rawHistory.paging;
                observer.next(historyPage);
                observer.complete();
            }, err => {
                observer.throw(err);
                observer.complete();
            });
        });
    }

    mapHistoryToJson(history: History): HistoryRequestQuery {
        let json: HistoryRequestQuery;
        json = new HistoryRequestQuery();

        json.id = history.id;
        json.comment = history.comment;
        json.commentedByDevoteeId = history.commentedByDevoteeId;
        json.ratedDevoteeId = history.ratedDevoteeId;
        json.rating = history.rating;
        json.response = history.response;
        json.timeStamp = (new Date(history.timeStamp)).toJSON();

        return json;
    }

    mapJsonToHistory(json: HistoryResponseQuery): History {
        let history: History;
        history = new History();

        history.id = json.id;
        history.comment = json.comment;
        history.commentedByDevoteeId = json.commentedByDevoteeId;
        history.commentedByDevoteeName = json.commentedByDevoteeName;
        history.ratedDevoteeId = json.ratedDevoteeId;
        history.ratedDevoteeName = json.ratedDevoteeName;
        history.rating = json.rating;
        history.response = json.response;
        history.timeStamp = json.timeStamp;

        return history;
    }
}