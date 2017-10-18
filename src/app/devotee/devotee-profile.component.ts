import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Devotee } from '../model/devotee.model';
import { Gender } from '../model/devotee.model';
import { MaritalStatus } from '../model/devotee.model';
import { routeConstants, statusType } from '../shared/app-properties';

import { DevoteeService } from './devotee.service';
import { StatusService } from '../shared/status.service';

@Component({
    selector: 'devotee-profile',
    templateUrl: './devotee-profile.component.html',
})

export class DevoteeProfileComponent implements OnInit {
    devotee: Devotee;
    resetDevotee: Devotee;
    datePicker: NgbDateStruct;

    gender: string[];
    maritalStatus: string[];

    displayDob: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private devoteeService: DevoteeService,
        private modalService: NgbModal,
        private statusService: StatusService,
    ) {}

    ngOnInit() {
        this.devotee = new Devotee();
        this.resetDevotee = new Devotee();

        this.gender = this.devoteeService.getGenderList();
        this.maritalStatus = this.devoteeService.getMaritalStatusList();

        this.activatedRoute.params.subscribe((params: Params) => {
            this.devoteeService.loadDevotee(+params[routeConstants.paramDevoteeId])
            .subscribe(devotee => {
                this.devotee = devotee;
                this.resetDevotee = devotee;
                if (this.devotee.dob) {
                    this.datePicker = { 
                        year: this.devotee.dob.getFullYear(),
                        month: this.devotee.dob.getMonth()+1,
                        day: this.devotee.dob.getDate(),
                    };
                }
            }, err => {
                //Route to a different Page
            });
        });
    }

    onDateChange() {
        this.devotee.dob = new Date(this.datePicker.year + "-" + this.datePicker.month + "-" + this.datePicker.day);
    }

    onUpdateClick() {
        this.devoteeService.updateDevotee(this.devotee).subscribe(devotee => {
            this.router.navigate(['../../'], {relativeTo: this.activatedRoute, queryParams: {id: this.devotee.id} });
        }, err => {
            this.statusService.setFlag("Error updating devotee", statusType.error);
        });
    }

    onResetClick() {
        this.devotee = this.resetDevotee;
        if (this.devotee.dob) {
            this.datePicker = { 
                year: this.devotee.dob.getFullYear(),
                month: this.devotee.dob.getMonth()+1,
                day: this.devotee.dob.getDate(),
            };
        } else {
            document.getElementById("dobInput")["value"] = "";
        }
    }

    genderClick(input: string) {
        this.devotee.gender = input;
    }

    maritalStatusClick(input: string) {
        this.devotee.maritalStatus = input;
    }

    //Modal trigger
    onUpdateDatesClick(content) {
        this.modalService.open(content).result.then((result) => {
          if (result == "ok") {
            //Navigate to important dates page
          }
        });
      }
}