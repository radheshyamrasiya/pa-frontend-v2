import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { isNumeric } from "rxjs/util/isNumeric"

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
                this.statusService.error("Insufficient parameters");
                this.router.navigate(['../']);
            } else if (yatraId != undefined) {
                this.program.parentYatraId = yatraId;
                if (isNumeric(programId)) {
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
            }
        });
    }

    onSelectMentorClick(content) {
        this.modalService.open(content).result.then((devoteeId: number) => {
            console.log(`Clicked Devotee with id ${devoteeId}`);
            this.httpService.getData(`${connectionProperties.devotees}/${devoteeId}`)
                .subscribe((devotee) => {
                    this.devotee = devotee as Devotee;
                    this.program.mentorId = this.devotee.id;
                }, (err) => {
                    this.statusService.error("Unable to fetch devotee");
                })
        }, (err) => {
            console.log(`dismiss called with reason ${err}`);
        });
    }

    validatePage(): boolean {
        if (this.program.name == null || this.program.name == "") {
            this.statusService.error("Enter Program Name");
            return false;
        }
        if (this.program.mentorId == null || this.program.mentorId == undefined) {
            this.statusService.error("Select a Mentor");
            return false;
        }
        if (this.program.type == null || this.program.type == "") {
            this.statusService.error("Select a Program Type");
            return false;
        }
        if (this.program.targetAudience == null || this.program.targetAudience == "") {
            this.statusService.error("Select Target Audiance");
            return false;
        }
        return true
    }

    onCreateProgramClick() {
        if (!this.validatePage()) return;
        this.httpService.postAndReturnData(connectionProperties.createProgram,'',this.program)
        .subscribe(responseProgram => {
            //Handle Success
            this.statusService.success(`Created program ${this.program.name} successfully!`);
            this.onBackClick();
        }, err => {
            //Handle Error
            this.statusService.error('Unable to create program, please contact admin');
        });
    }

    onUpdateProgramClick() {
        if (!this.validatePage()) return;
        this.httpService.putAndReturnData(connectionProperties.updateProgram,"/" + this.program.id,this.program)
        .subscribe(responseProgram => {
            //Handle Success
            this.statusService.success(`Updated program ${this.program.name} successfully!`);
            this.onBackClick();
        }, err => {
            //Handle Error
            this.statusService.error(`Unable to update program, please contact admin`);
        });
    }

    onBackClick() {
        if(this.router.routerState.snapshot.url.startsWith(routeConstants.yatra + '/' + routeConstants.editProgram, 1)) {
            this.router.navigate(['../../../', routeConstants.listProgram, this.program.parentYatraId], {relativeTo: this.activatedRoute});
        } else {
            if (this.isCreate)
                this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
            else
                this.router.navigate(['../../../'], {relativeTo: this.activatedRoute});
        }
    }
}
