import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { connectionProperties, statusType, dbRequestPageSize } from '../shared/app-properties';
import { Entity, Page, Paging, DBQueryParams } from '../model/entity.model';
import { StatusService } from './status.service';

type HttpFunction = (url: string, body?: any, params?: any) => any;

@Injectable()
export class HttpService {
    headers: Headers;
    
    constructor(
        private http: Http,
        private statusService: StatusService,
    ) { }
    
    public init(username: string, password: string): void {
        this.headers = new Headers;
        this.headers.append('Authorization', 'Basic ' +
        btoa(username + ':' + password));
    }

    public get(url: string, body?: any, params?: any): Observable<any> {
        return this.http.get(connectionProperties.baseUrl + url, {
            headers: this.headers,
            params: params
        });
    }

    public post(url: string, body: any, params?: any): Observable<any> {
        return this.http.post(connectionProperties.baseUrl + url, body, {
            headers: this.headers
        });
    }

    public put(url: string, body: any, params?: any): Observable<any> {
        return this.http.put(connectionProperties.baseUrl + url, body, {
            headers: this.headers
        });
    }

    public delete(url: string, body?: any, params?: any): Observable<any> {
        return this.http.delete(connectionProperties.baseUrl + url, {
            headers: this.headers
        });
    }

    private crudOperation(method: string, url: string, body?: any, params?: any): Observable<any> {
        switch(method) {
            case "get":
                return this.http.get(connectionProperties.baseUrl + url, {
                    headers: this.headers,
                    params: params
                });
            case "post":
                return this.http.post(connectionProperties.baseUrl + url, body, {
                    headers: this.headers
                });
            case "put":
                return this.http.put(connectionProperties.baseUrl + url, body, {
                    headers: this.headers
                });
            case "delete":
                return this.http.delete(connectionProperties.baseUrl + url, {
                    headers: this.headers
                });
        }
    }

    //Support Functions
    private constructUrl(url: string, params?: string | DBQueryParams):string {
        let pagingSortingParams = "?page=0&size=" + dbRequestPageSize;
        if (params == undefined) return url + pagingSortingParams; 
        if (typeof params === 'string') return url + params + pagingSortingParams;

        let page = (params.page==undefined)?'0':params.page.toString();
        let size = (params.pageSize==undefined)?dbRequestPageSize.toString():params.pageSize.toString();
        let sort = (params.sortString==undefined)?'':'&sort=' + params.sortString;
        let pathParams = (params.pathParams==undefined)?'':params.pathParams;

        pagingSortingParams = "?page=" + page + "&size=" + size + sort;
        return url + pathParams + pagingSortingParams;
    }

    private processQueryParams(params?: string | DBQueryParams): any{
        if (params == undefined) return [];
        if (typeof params === 'string') return [];
        if (params.queryParams == undefined) return [];
        return params.queryParams;
    }

    private processPageJSON(response: any): Page {
        let contents = new Page();
        let contentBody = JSON.parse(response._body);
        contents.dataList = contentBody.data;
        contents.paging = contentBody.paging;
        return contents;
    }

    private processJSON(response: any): Entity {
        let contents = new Entity();
        let resData = JSON.parse(response._body);
        contents = resData.data;
        return contents;
    }

    //Get List & Data
    private getGenericList(method: string, url: string, params?: string | DBQueryParams, data?: any): Observable<Page> {
        return Observable.create(observer => {
            this.crudOperation(
                method,
                this.constructUrl(url,params), 
                data,
                this.processQueryParams(params)
            )
            .subscribe(res => {
                observer.next(this.processPageJSON(res));
                observer.complete();
            }, err => {
                this.statusService.error("Error performing action");
                observer.throw(err);
                observer.complete();
            });
        });
    }

    private getGenericData(method: string, url: string, params?: string | DBQueryParams, data?: any): Observable<Entity> {
        return Observable.create(observer => {
            this.crudOperation(
                method,
                this.constructUrl(url,params), 
                data,
                this.processQueryParams(params)
            )
            .subscribe(res => {
                observer.next(this.processJSON(res));
                observer.complete();
            }, err => {
                this.statusService.error("Error performing action");
                observer.throw(err);
                observer.complete();
            });
        });
    }

    //CRUD Methods
    getList(url: string, params?: string | DBQueryParams): Observable<Page> {
        return this.getGenericList("get", url, params);
    }
    getData(url: string, params?: string | DBQueryParams): Observable<Entity> {
        return this.getGenericData("get", url, params);
    }

    postAndReturnList(url: string, params: string | DBQueryParams, data: any): Observable<Page> {
        return this.getGenericList("post", url, params, data);
    }
    postAndReturnData(url: string, params: string | DBQueryParams, data: any): Observable<Entity> {
        return this.getGenericData("post", url, params, data);
    }
    
    putAndReturnList(url: string, params: string | DBQueryParams, data: any): Observable<Page> {
        return this.getGenericList("put", url, params, data);
    }
    putAndReturnData(url: string, params: string | DBQueryParams, data: any): Observable<Entity> {
        return this.getGenericData("put", url, params, data);
    }

    deleteAndReturnList(url: string, params?: string | DBQueryParams): Observable<Page> {
        return this.getGenericList("delete", url, params);
    }
    deleteAndReturnData(url: string, params?: string | DBQueryParams): Observable<Entity> {
        return this.getGenericData("delete", url, params);
    }
}