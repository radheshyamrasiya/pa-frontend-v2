import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DevoteeSearchComponent } from '../shared/devotee-search/devotee-search.component';
import { DevoteeDisplayComponent } from '../shared/devotee-display/devotee-display.component';

import { DevoteeDisplayParams } from '../model/devotee-display.model'; 
import { DevoteeMinPage, DevoteeMin } from '../model/devotee.model';
import { AttendanceSpecificPage, AttendanceSpecific } from '../model/attendance-specific.model';
import { AttendanceAdd } from '../model/attendance-add.model';
import { Paging } from '../model/entity.model';
import { HttpService } from '../shared/http.service';

import { routeConstants, connectionProperties } from '../shared/app-properties';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
})

export class MarkAttendanceComponent implements OnInit {
  //Date Picker data
  attendanceDate;
  //Input from URL
  programId: number;
  //Processed values of backend response
  attendancePaging: Paging;
  attendanceSpecific: AttendanceSpecific;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) { }
  devoteeDisplayParams: DevoteeDisplayParams;

  ngOnInit() {
    this.attendanceSpecific = new AttendanceSpecific();
    this.attendanceSpecific.devoteeList = [];
    this.attendanceSpecific.attendanceId = [];
    //Setting the Attendance Date Picker of to today's date
    let now = new Date();
    this.attendanceDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };

    this.activatedRoute.params.subscribe(params => {
      this.programId = +params[routeConstants.paramsProgramId];
      this.loadContents(0);

      this.devoteeDisplayParams = new DevoteeDisplayParams();
      this.devoteeDisplayParams.contents = this.prepareAttendeeList();
      this.devoteeDisplayParams.showMore = false;
      this.devoteeDisplayParams.quickActionIcon = "oi oi-trash";
      this.devoteeDisplayParams.displayActions = [
        {
          buttonText: "Remove",
          buttonIcon: "oi oi-trash"
        },
      ]
    });
  }

  prepareAttendeeList(): DevoteeMinPage {
    let attendeeList = new DevoteeMinPage();
    attendeeList.dataList = this.attendanceSpecific.devoteeList;
    attendeeList.paging = this.attendancePaging;
    return attendeeList;
  }

  getAttendanceDateFromPicker(): Date {
    let attendanceDate: Date;
    attendanceDate = new Date(
      this.attendanceDate.year, 
      this.attendanceDate.month,
      this.attendanceDate.day
    );
    return attendanceDate;
  }

  markAttendanceForDevotee(devoteeId: number, page:number) {
    let attendanceAdd = new AttendanceAdd();
    attendanceAdd.programId = this.programId;
    attendanceAdd.devoteeId = devoteeId;
    attendanceAdd.attendanceDate = this.getAttendanceDateFromPicker();
    //Topic to be added
    this.httpService.post(connectionProperties.markAttendance, attendanceAdd)
    .subscribe(attendanceDetail => {
      //See if it is successful
      this.loadContents(page);
    });
  }

  removeAttendance(devoteeId: number, page: number) {
    let attendanceId: number;
    attendanceId = this.attendanceSpecific.attendanceId.find(x => x.devoteeId == devoteeId).attendanceId;
    this.httpService.delete(connectionProperties.removeAttendance + '/' + attendanceId)
    .subscribe( () => {
      //See if it is successful
      this.loadContents(page);
    });
  }

  loadContents(page: number) {
    this.httpService.getList(connectionProperties.getProgramAttendance, {
        page: page,
        pathParams: '/' + this.programId + '/' + this.getAttendanceDateFromPicker()
    })
    .subscribe(attendance => {
        if (attendance!= undefined && attendance!=null) {
          let attendanceSpecificPage: AttendanceSpecificPage;
          attendanceSpecificPage = attendance as AttendanceSpecificPage;
          
          this.attendancePaging = attendanceSpecificPage.paging;
          this.attendanceSpecific = attendanceSpecificPage.dataList[0] as AttendanceSpecific;
          this.devoteeDisplayParams.contents = this.prepareAttendeeList();
        } 
    });
  }

  actionCallBack(action: string, devoteeId: number, page: number) {
    switch(action) {
      case "Remove":
        this.removeAttendance(devoteeId, page);
      default:
        //Wrong action in callback
    }
  }
}
