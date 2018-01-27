import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Devotee } from '../model/devotee.model';
import { routeConstants, statusType, connectionProperties } from '../shared/app-properties';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';
import { EnumService } from '../shared/enum.service';

@Component({
    selector: 'devotee-profile',
    templateUrl: './devotee-profile.component.html',
})

export class DevoteeProfileComponent implements OnInit {
    devotee: Devotee;
    resetDevotee: Devotee;
    datePicker: NgbDateStruct;

    displayDob: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private httpService: HttpService,
        private modalService: NgbModal,
        private statusService: StatusService,
        private enumService: EnumService,
    ) {}

    ngOnInit() {
        this.devotee = new Devotee();
        this.resetDevotee = new Devotee();

        this.activatedRoute.params.subscribe((params: Params) => {
            this.httpService.getData(connectionProperties.devotees, "/" + params[routeConstants.paramDevoteeId])
            .subscribe(devotee => {
                this.devotee = devotee as Devotee;
                this.resetDevotee = devotee as Devotee;
                if (this.devotee.dob) {
                    this.devotee.dob = new Date(this.devotee.dob);
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
        console.log(this.devotee.dob); 
    }

    onUpdateClick() {
        this.devotee.dob = new Date(this.datePicker.year + "-" + this.datePicker.month + "-" + this.datePicker.day);
        this.httpService.putAndReturnData(connectionProperties.devotees,"/" + this.devotee.id, this.devotee)
        .subscribe(devotee => {
            this.router.navigate(['../../'], {relativeTo: this.activatedRoute, queryParams: {id: this.devotee.id} });
        }, err => {
            this.statusService.setFlag("Error updating devotee", statusType.error);
        });
    }

    onResetClick() {
        this.devotee = this.resetDevotee;
        if (this.devotee.dob) {
            this.devotee.dob = new Date(this.devotee.dob);
            this.datePicker = { 
                year: this.devotee.dob.getFullYear(),
                month: this.devotee.dob.getMonth()+1,
                day: this.devotee.dob.getDate(),
            };
        } else {
            document.getElementById("dobInput")["value"] = "";
        }
    }

    onBackClick() {
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute, queryParams: {id: this.devotee.id} });
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