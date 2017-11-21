import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { connectionProperties, statusType, dbRequestPageSize } from '../shared/app-properties';
import { GenericPage } from '../model/generic-page.model';

@Injectable()
export class HttpService {
    headers: Headers;
    
    constructor(private http: Http) { }
    
    public init(username: string, password: string): void {
        this.headers = new Headers;
        this.headers.append('Authorization', 'Basic ' +
        btoa(username + ':' + password));
    }

    public get(url: string, params?: any): Observable<any> {
        return this.http.get(connectionProperties.baseUrl + url, {
            headers: this.headers,
            params: params
        });
    }

    public post(url: string, body: any): Observable<any> {
        return this.http.post(connectionProperties.baseUrl + url, body, {
            headers: this.headers
        });
    }

    public put(url: string, body: any): Observable<any> {
        return this.http.put(connectionProperties.baseUrl + url, body, {
            headers: this.headers
        });
    }

    public delete(url: string): Observable<any> {
        return this.http.delete(connectionProperties.baseUrl + url, {
            headers: this.headers
        });
    }
}