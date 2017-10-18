import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../shared/http.service';
import { connectionProperties } from '../shared/app-properties';
import { History } from '../model/history.model';
import { HistoryRequestQuery, HistoryResponseQuery } from '../model-get/history-query.model';

@Injectable()
export class HistoryService {
    constructor(
        private httpService: HttpService,
    ) { }

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

    loadHistory(devoteeId: number): Observable<History[]> {
        let historyResponseJson: HistoryResponseQuery;
        let historyList: History[];

        return Observable.create(observer => {
            this.httpService.get(connectionProperties.historyOf + '/' + devoteeId)
            .subscribe(res => {
                let rawHistory = JSON.parse(res._body);
                historyList = rawHistory.data;
                observer.next(historyList);
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