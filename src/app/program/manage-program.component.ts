import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { Program } from '../model/program.model';
import { statusType, routeConstants } from '../shared/app-properties';

import { ProgramService } from '../program/program.service';
import { StatusService } from '../shared/status.service';
import { EnumService } from '../shared/enum.service';

@Component({
    selector: 'manage-program',
    templateUrl: 'manage-program.component.html'
})

export class ManageProgramComponent implements OnInit {
    program: Program;
    task: string;

    constructor(
        private modalService: NgbModal,
        private programService: ProgramService,
        private statusService: StatusService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private enumService: EnumService,
    ) { }

    ngOnInit() {
        this.program = new Program();
        this.activatedRoute.params.subscribe(params => {
            let programId = +params[routeConstants.paramsProgramId];
            this.programService.loadProgram(+programId)
            .subscribe(program => {
                this.program = program;
            }, err => {
                    //
            });
        });
    }

    onUpdateProgramClick() {
        this.programService.updateProgram(this.program)
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