import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { Devotee } from '../model/devotee.model';
import { Program } from '../model/program.model';
import { statusType, routeConstants, connectionProperties } from '../shared/app-properties';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';
import { EnumService } from '../shared/enum.service';

@Component({
    selector: 'create-program',
    templateUrl: 'create-program.component.html'
})

export class CreateProgramComponent implements OnInit {
    devotee: Devotee;
    program: Program;
    emailAddress: string;
    isCreate: boolean; //Toggles the visiblity of register/update buttons

    constructor(
        private modalService: NgbModal,
        private httpService: HttpService,
        private statusService: StatusService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public enumService: EnumService,
    ) { }

    ngOnInit() {
        this.isCreate = true;
        this.devotee = new Devotee();
        this.program = new Program();

        this.activatedRoute.params.subscribe(params => {
            let yatraId = +params[routeConstants.paramsYatraId];
            let programId = +params[routeConstants.paramsProgramId];

            if (yatraId == undefined && programId == undefined) {
                this.statusService.setFlag("Insufficient parameters", statusType.error);
                this.router.navigate(['../']);
            } else if (yatraId != undefined) {
                this.program.parentYatraId = yatraId;
            }else if (programId != undefined) {
                this.isCreate = false;
                this.httpService.getData(connectionProperties.getProgram, "/" + programId)
                .subscribe(program => {
                    this.isCreate = false;
                    this.program = program as Program;
                    this.httpService.getData(connectionProperties.devotees, '/' + this.program.mentorId)
                    .subscribe(devotee => {
                        this.devotee = devotee as Devotee;
                    }, err => {
                        //
                    })
                }, err => {
                    //
                })
            }
        });
    }

    onSelectMentorClick(content) {
        this.modalService.open(content).result.then((result) => {
            if (result=="fetch") {
                this.httpService.getData(connectionProperties.devoteesByEmailId, {
                    queryParams: {email: this.emailAddress}
                })
                .subscribe((devotee) => {
                    this.program.mentorId = (<Devotee>devotee).id;
                    this.devotee = devotee as Devotee;
                }, err => {
                    this.statusService.setFlag("Email not found! Unable to fetch devotee", statusType.error);
                });
            }
        });
    }

    validatePage(): boolean {
        if (this.program.name == null || this.program.name == "") {
            this.statusService.setFlag("Enter Program Name", statusType.error);
            return false;
        }
        if (this.program.mentorId == null || this.program.mentorId == undefined) {
            this.statusService.setFlag("Select a Mentor", statusType.error);
            return false;
        }
        if (this.program.type == null || this.program.type == "") {
            this.statusService.setFlag("Select a Program Type", statusType.error);
            return false;
        }
        if (this.program.targetAudience == null || this.program.targetAudience == "") {
            this.statusService.setFlag("Select Target Audiance", statusType.error);
            return false;
        }
        return true
    }

    onCreateProgramClick() {
        if (!this.validatePage()) return;
        this.httpService.postAndReturnData(connectionProperties.createProgram,'',this.program)
        .subscribe(responseProgram => {
            //Handle Success
        }, err => {
            //Handle Error
        });
    }

    onUpdateProgramClick() {
        if (!this.validatePage()) return;
        this.httpService.putAndReturnData(connectionProperties.updateProgram,"/" + this.program.id,this.program)
        .subscribe(responseProgram => {
            //Handle Success
        }, err => {
            //Handle Error
        });
    }

    onBackClick() {
        if (this.isCreate)
            this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
        else
            this.router.navigate(['../../../'], {relativeTo: this.activatedRoute});
    }
}