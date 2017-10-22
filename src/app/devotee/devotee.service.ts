import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { Devotee, } from '../model/devotee.model';
import { HttpService } from '../shared/http.service';
import { connectionProperties, statusType } from '../shared/app-properties';
import { DevoteeQueryModel } from '../model-get/devotee-query.model';
import { StatusService } from '../shared/status.service';

@Injectable()
export class DevoteeService {
    devotee: Devotee;

    constructor(
        private httpService: HttpService,
        private statusService: StatusService,
    ) { }
    
    captureDevotee(devotee: Devotee) { //: Observable<boolean> {
        //return Observable.create(observer => {
            this.httpService
            .post(connectionProperties.capture, devotee)
            .subscribe(res => {
                let devoteeDetail = JSON.parse(res._body);
                let devoteeJson = devoteeDetail;
                this.devotee = this.mapJsonToDevotee(devoteeJson);
                //observer.next(true);
            }, err => {
                this.statusService.setFlag("Error saving devotee details", statusType.error);
                //observer.next(false);
            });
            //observer.complete();
        //});
    }

    loadDevotee(devoteeId: number): Observable<Devotee> {
        let devoteeJson: DevoteeQueryModel;
        //Code to get a devotee
        return Observable.create(observer => {
            this.httpService
            .get(connectionProperties.devotees + '/' + devoteeId)
            .subscribe(res => {
                let devoteeDetail = JSON.parse(res._body);
                devoteeJson = devoteeDetail.data;
                this.devotee = this.mapJsonToDevotee(devoteeJson);
                observer.next(this.devotee);
                observer.complete();    
            }, err => {
                this.statusService.setFlag("Error retriving devotee details", statusType.error);
                observer.throw(err);
                observer.complete();
            });
        });
    }

    getDevotee(): Devotee {
        return this.devotee;
    }

    getDevoteeByEmailId(emailId: string): Observable<Devotee> {
        let devoteeJson: DevoteeQueryModel;
        //Code to get a devotee
        return Observable.create(observer => {
            this.httpService
            .get(connectionProperties.devoteesByEmailId + '/' + emailId)
            .subscribe(res => {
                let devoteeDetail = JSON.parse(res._body);
                devoteeJson = devoteeDetail.data;
                this.devotee = this.mapJsonToDevotee(devoteeJson);
                observer.next(this.devotee);
                observer.complete();    
            }, err => {
                this.statusService.setFlag("Error retriving devotee details", statusType.error);
                //observer.throw(err);
                observer.complete();
            });
        });
    }

    updateDevotee(devotee: Devotee): Observable<Devotee>
    {
        let devoteeJson: DevoteeQueryModel;
        //Code to get a devotee
        return Observable.create(observer => {
            this.httpService
            .put(connectionProperties.devotees + '/' + devotee.id, devotee)
            .subscribe(res => {
                let devoteeDetail = JSON.parse(res._body);
                devoteeJson = devoteeDetail;
                this.devotee = this.mapJsonToDevotee(devoteeJson);
                observer.next(this.devotee);
                this.statusService.setFlag(this.devotee.legalName + " updated", statusType.success);
                observer.complete();   
            }, err => {
                this.statusService.setFlag("Error updating devotee details", statusType.error);
                observer.throw(err);
                observer.complete();
            });
        });
    }

    mapJsonToDevotee(json: DevoteeQueryModel): Devotee {
        let devotee = new Devotee();
        devotee.id = json.id;
        devotee.legalName = json.legalName;
        devotee.initiatedName = json.initiatedName;
        devotee.displayName = json.displayName;
        devotee.dob = new Date(json.dob);
        devotee.gender = json.gender; //Enum Convertion
        devotee.maritalStatus = json.maritalStatus; //Enum Convertion
        devotee.familyInfo = json.familyInfo;
        devotee.education = json.education;
        devotee.occupation = json.occupation;
        devotee.organization = json.organization;
        devotee.designation = json.designation;
        devotee.smsPhone = json.smsPhone;
        devotee.area = json.area;
        devotee.address = json.address;
        devotee.email = json.email;
        devotee.preferredLanguage = json.preferredLanguage;
        devotee.booksRead = json.booksRead;
        devotee.monthlyContribution = json.monthlyContribution;
        devotee.sikshaLevel = json.sikshaLevel;
        devotee.description = json.description;
        devotee.capturedBy = json.capturedBy;
        devotee.capturedFor = json.capturedFor;
        devotee.introDate = json.introDate;
        return devotee;
    }

    mapDevoteeToJson(devotee: Devotee): DevoteeQueryModel {
        let json = new DevoteeQueryModel();
        json.id = devotee.id;
        json.legalName = devotee.legalName;
        json.initiatedName = devotee.initiatedName;
        json.displayName = devotee.displayName;
        json.dob = devotee.dob.toString();
        json.gender = devotee.gender; //Enum Convertion
        json.maritalStatus = devotee.maritalStatus; //Enum Convertion
        json.familyInfo = devotee.familyInfo;
        json.education = devotee.education;
        json.occupation = devotee.occupation;
        json.organization = devotee.organization;
        json.designation = devotee.designation;
        json.smsPhone = devotee.smsPhone;
        json.area = devotee.area;
        json.address = devotee.address;
        json.email = devotee.email;
        json.preferredLanguage = devotee.preferredLanguage;
        json.booksRead = devotee.booksRead;
        json.monthlyContribution = devotee.monthlyContribution;
        json.sikshaLevel = devotee.sikshaLevel;
        json.description = devotee.description;
        json.capturedBy = devotee.capturedBy;
        json.capturedFor = devotee.capturedFor;
        json.introDate = devotee.introDate;
        return json;
    }
}