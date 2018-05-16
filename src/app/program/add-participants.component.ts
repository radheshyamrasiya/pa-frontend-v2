import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, merge } from 'rxjs/operators';

import { routeConstants, connectionProperties } from '../shared/app-properties';
import { ProgramAssignment, ProgramAssignmentPage } from '../model/program-assignment.model';
import { Paging } from '../model/entity.model';
import { Devotee, DevoteeMinPage, DevoteeMin } from '../model/devotee.model';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
    selector: 'add-participants',
    templateUrl: 'add-participants.component.html'
})

export class AddParticipantsComponent implements OnInit {
    contents: ProgramAssignmentPage;
    typeAheadDevoteeSearch: DevoteeMinPage;
    devoteeList: DevoteeMin[];
    email: string;
    programId: number;

    emailSearching = false;
    emailSearchFailed = false;
    hideSearchingWhenUnsubscribed = new Observable(() => () => this.emailSearching = false);

    constructor(
        private httpService: HttpService,
        private activatedRoute: ActivatedRoute,
        private statusService: StatusService,
        private router: Router,
    ) { }

    ngOnInit() { 
        this.contents = new ProgramAssignmentPage();
        this.contents.dataList = [];
        this.contents.paging = new Paging();

        this.activatedRoute.params.subscribe(params => {
            this.programId = +params[routeConstants.paramsProgramId];
        });
        this.loadContents(0);
    }

    loadContents(page: number) {
        this.httpService.getList(connectionProperties.listProgramAssignment, {
            page: page,
            pathParams: "/" + this.programId,
        })
        .subscribe(volunteerList => {
            if (volunteerList!= undefined && volunteerList!=null) {
                this.contents = volunteerList as ProgramAssignmentPage;
            } 
        });
    }

    searchDevotee(term: string) {
        console.log("reached here");
        
        return this.httpService.getList(
            connectionProperties.devoteeGlobalSearch,
            "/" + this.email
        ).pipe(map(searchResult => searchResult[1]));
    }
    emailSearch = (text$: Observable<string>) => text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map(term => (term as string).length < 2 ? []
            : states.filter(v => v.toLowerCase().indexOf((term as string).toLowerCase()) > -1).slice(0, 10))
        /*tap(() => this.emailSearching = true),
        switchMap(
            term => this.searchDevotee(term as string).pipe(
                tap(() => this.emailSearchFailed = false),
            )
        ),
        tap(() => this.emailSearching = false),
        merge(this.hideSearchingWhenUnsubscribed)*/
    );

    onParticipantAddClick() {
        this.httpService.getData(connectionProperties.devoteesByEmailId, {
            queryParams: {email: this.email}
        })
        .subscribe(devotee => {
            if (devotee==undefined || devotee == null) {
                this.statusService.error("No devotee found for email id: " + this.email);
                return
            }
            let programAssignment =  new ProgramAssignment();
            programAssignment.attendeeId = (<Devotee>devotee).id;
            programAssignment.programId = this.programId;
            
            this.httpService.postAndReturnList(connectionProperties.createProgramAssignment,'', programAssignment)
            .subscribe(volunteerList => {
                if (volunteerList!= undefined && volunteerList!=null) {
                    this.contents = volunteerList;
                } 
            });
        });
    }

    onRemoveParticipantClick(assignmentId: number) {
        this.httpService.deleteAndReturnList(connectionProperties.deleteProgramAssignment, "/" + this.programId + "/" + assignmentId)
        .subscribe(volunteerList => {
            if (volunteerList!= undefined && volunteerList!=null) {
                this.contents = volunteerList;
            } 
        });
    }

    onBackClick() {
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
}