import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { Program } from '../model/program.model';
import { ProgramAreaSubscription, ProgramAreaSubscriptionPage } from '../model/program-area-subscription.model';
import { statusType, routeConstants, connectionProperties } from '../shared/app-properties';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';
import { EnumService } from '../shared/enum.service';

@Component({
    selector: 'manage-program',
    templateUrl: 'manage-program.component.html'
})

export class ManageProgramComponent implements OnInit {
    program: Program;
    areaSubscription: ProgramAreaSubscriptionPage;
    task: string;
    postalCode: string;
    countryCodeText: string;

    constructor(
        private modalService: NgbModal,
        private httpService: HttpService,
        private statusService: StatusService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private enumService: EnumService,
    ) { }

    ngOnInit() {
        this.program = new Program();
        this.areaSubscription = new ProgramAreaSubscriptionPage();
        this.countryCodeText = "";
        this.areaSubscription.dataList = [];
        this.activatedRoute.params.subscribe(params => {
            let programId = +params[routeConstants.paramsProgramId];
            this.httpService.getData(connectionProperties.getProgram, "/" + programId)
            .subscribe(program => {
                this.program = program as Program;
                this.loadProgramAreaSubscription();
            }, err => {
                    //
            });
        });
    }

    loadProgramAreaSubscription() {
        this.httpService.getList(connectionProperties.listProgramAreaSubscription, '/' + this.program.id)
        .subscribe(areaSubscription => {
            this.areaSubscription = areaSubscription;
            if (this.areaSubscription.dataList.length > 0)
                this.countryCodeText = (<ProgramAreaSubscription>this.areaSubscription.dataList[0]).countryCode; 
        }, err => {
            //Hande error
        });
    }

    deleteProgramAreaSubscription(subscriptionId: number) {
        this.httpService.deleteAndReturnList(connectionProperties.deleteProgramAreaSubscription, "/" + this.program.id + "/" + subscriptionId)
        .subscribe(areaSubscription => {
            this.areaSubscription = areaSubscription;
            if (this.areaSubscription.dataList.length > 0)
                this.countryCodeText = (<ProgramAreaSubscription>this.areaSubscription.dataList[0]).countryCode; 
        }, err => {
            //Hande error
        });
    }

    onAreaSubscriptionClick(content) {
        this.modalService.open(content).result.then((result) => {
            if (result == "ok") {
              //Navigate to important dates page
            }
        });
    }

    onPostalCodeAddClick() {
        if (this.countryCodeText == "")
            return; 
        let paSubscription = new ProgramAreaSubscription();
        paSubscription.countryCode = this.countryCodeText;
        paSubscription.programId = this.program.id;
        paSubscription.zipPostalCode = this.postalCode;
        this.httpService.postAndReturnList(connectionProperties.createProgramAreaSubscription, '', paSubscription)
        .subscribe(areaSubscription => {
            this.areaSubscription = areaSubscription;
            if (this.areaSubscription.dataList.length > 0)
                this.countryCodeText = (<ProgramAreaSubscription>this.areaSubscription.dataList[0]).countryCode; 
                this.postalCode = "";
        }, err => {
            //Hande error
        });
    }

    onUpdateProgramClick() {
        this.httpService.putAndReturnData(connectionProperties.updateProgram, "/" + this.program.id, this.program)
        .subscribe(responseProgram => {
            //Handle Success
        }, err => {
            //Handle Error
        });
    }

    onTaskAddClick() {
        if (this.program.followupDescription == null || this.program.followupDescription == undefined)
            this.program.followupDescription = [];
        this.program.followupDescription.push(this.task);
        this.task = "";
    }

    onTaskRemoveClick(taskItem: string) {
        this.program.followupDescription.splice(this.program.followupDescription.indexOf(taskItem,0),1);
    }

    onBackClick() {
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
}