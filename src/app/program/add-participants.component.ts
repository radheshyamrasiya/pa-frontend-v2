import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, merge } from 'rxjs/operators';

import { routeConstants, connectionProperties } from '../shared/app-properties';
import { ProgramAssignment, ProgramAssignmentPage } from '../model/program-assignment.model';
import { Paging } from '../model/entity.model';
import { Devotee, DevoteeMinPage, DevoteeMin } from '../model/devotee.model';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';

@Component({
    selector: 'add-participants',
    templateUrl: 'add-participants.component.html'
})

export class AddParticipantsComponent implements OnInit {
    activePanel: string;
    contents: ProgramAssignmentPage;
    email: string;
    programId: number;

    emailSearching = false;
    emailSearchFailed = false;
    hideSearchingWhenUnsubscribed = new Observable(() => () => this.emailSearching = false);

    devoteeList: DevoteeMin[];
    searchText: string;

    constructor(
        private httpService: HttpService,
        private activatedRoute: ActivatedRoute,
        private statusService: StatusService,
        private router: Router,
    ) { }

    ngOnInit() { 
        this.activePanel = "";
        this.contents = new ProgramAssignmentPage();
        this.contents.dataList = [];
        this.contents.paging = new Paging();

        this.devoteeList = [];

        this.activatedRoute.params.subscribe(params => {
            this.programId = +params[routeConstants.paramsProgramId];
        });

        this.activatedRoute.queryParams.subscribe(params => {
            if (params["id"]) 
                this.activePanel = params["id"] + "_id";
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
        if (term === '') return of([]);
        
        return this.httpService.getList(
            connectionProperties.devoteeGlobalSearch,
            "/" + this.email
        ).pipe(
            tap((searchResult) => console.log(JSON.stringify((searchResult as ProgramAssignmentPage).dataList))),
            map(searchResult =>  (searchResult as DevoteeMinPage).dataList.map(assignment => (assignment as DevoteeMin).name))
        );
    }
    emailSearch = (text$: Observable<string>) => text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.emailSearching = true),
        switchMap(
            term => this.searchDevotee(term as string).pipe(
                tap(() => {
                    this.emailSearchFailed = false
                    console.log("second place")
                }),
            )
        ),
        tap(() => this.emailSearching = false),
        merge(this.hideSearchingWhenUnsubscribed)
    );

    textChange() {
        if (this.searchText === '') {
            this.devoteeList = [];
            return;
        }
        
        this.httpService.getList(
            connectionProperties.devoteeGlobalSearch,
            "/" + this.searchText
        ).subscribe(devoteePage => {
            this.devoteeList = (devoteePage as DevoteeMinPage).dataList as DevoteeMin[];
        });        
    }

    onParticipantAddClick(addDevoteeId) {
        let programAssignment =  new ProgramAssignment();
        programAssignment.attendeeId = addDevoteeId;
        programAssignment.programId = this.programId;
            
        this.httpService.postAndReturnList(connectionProperties.createProgramAssignment,'', programAssignment)
        .subscribe(participantList => {
            if (participantList!= undefined && participantList!=null) {
                    this.contents = participantList;
            } 
        });
        /*
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
        */
    }

    onRemoveParticipantClick(assignmentId: number) {
        this.httpService.deleteAndReturnList(connectionProperties.deleteProgramAssignment, "/" + this.programId + "/" + assignmentId)
        .subscribe(volunteerList => {
            if (volunteerList!= undefined && volunteerList!=null) {
                this.contents = volunteerList;
            } 
        });
    }

    onPhoneClick(devoteeId: string): void {
        this.router.navigate([routeConstants.myPrograms, routeConstants.addParticipants, routeConstants.writeComment, this.programId, devoteeId]);
    }

    onHistoryClick(devoteeId: string): void {
        this.router.navigate([routeConstants.myPrograms, routeConstants.addParticipants, routeConstants.history, this.programId, devoteeId]);
    }

    onProfileClick(devoteeId: string): void {
        this.router.navigate([routeConstants.myPrograms, routeConstants.addParticipants, routeConstants.devoteeProfile, this.programId, devoteeId]);
    }

    onCommentClick(devoteeId: string): void {
        this.router.navigate([routeConstants.myPrograms, routeConstants.addParticipants, routeConstants.writeComment, this.programId, devoteeId]);
    }

    onBackClick() {
        this.router.navigate([routeConstants.myPrograms]);
    }
}