import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Devotee } from '../model/devotee.model';
import { Gender } from '../model/devotee.model';
import { MaritalStatus } from '../model/devotee.model';
import { routeConstants } from '../shared/app-properties';

import { DevoteeService } from './devotee.service';

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
            console.log("Devotee is : " + devotee.legalName);
        }, err => {
            console.log("devotee: Some error occured", err);
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
            console.log("Clicked : " + result);
            //Navigate to important dates page
          }
        });
      }
}