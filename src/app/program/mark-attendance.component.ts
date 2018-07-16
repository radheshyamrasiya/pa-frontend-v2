import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { DevoteeSearchComponent } from '../shared/devotee-search/devotee-search.component';
import { DevoteeDisplayComponent } from '../shared/devotee-display/devotee-display.component';

import { DevoteeDisplayParams } from '../model/devotee-display.model'; 
import { DevoteeMinPage, DevoteeMin } from '../model/devotee.model';
import { AttendanceSpecificPage, AttendanceSpecific } from '../model/attendance-specific.model';
import { AttendanceAdd } from '../model/attendance-add.model';

import { ProgramSession } from '../model/program-session.model';

import { Paging } from '../model/entity.model';
import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';

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

  sessionId: number;

  //Processed values of backend response
  session: ProgramSession;
  attendancePaging: Paging;
  attendanceSpecific: AttendanceSpecific;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private statusService: StatusService,
  ) { }
  devoteeDisplayParams: DevoteeDisplayParams;

  ngOnInit() {
    this.attendanceSpecific = new AttendanceSpecific();
    this.attendanceSpecific.devoteeList = [];
    this.attendanceSpecific.attendanceId = [];

    //Initializing Session
    this.session = new ProgramSession();

    //Setting the Attendance Date Picker of to today's date
    let now = new Date();
    this.attendanceDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };

    this.activatedRoute.params.subscribe(params => {
      this.programId = +params[routeConstants.paramsProgramId];
      this.session.programId = this.programId;
      this.session.sessionDate = this.getAttendanceDateFromPicker();
      
      this.initialiseDevoteeDisplayParams();
      this.loadSession();
    });
  }

  initialiseDevoteeDisplayParams() {
    let devoteePage = new DevoteeMinPage();
    devoteePage.dataList = [];
    devoteePage.paging = new Paging();

    this.devoteeDisplayParams = new DevoteeDisplayParams();
    this.devoteeDisplayParams.contents = devoteePage;
    this.devoteeDisplayParams.showMore = false;
    this.devoteeDisplayParams.quickActionIcon = "oi oi-trash";
    this.devoteeDisplayParams.displayActions = [
      {
        buttonText: "Remove",
        buttonIcon: "oi oi-trash"
      },
    ]
  }

  loadSession() {
    this.session.sessionDate = this.getAttendanceDateFromPicker();
    this.httpService.getData(
      connectionProperties.getSessionByProgramAndDate +
      '/' + this.programId + '/' + this.session.sessionDate)
    .subscribe(response => {
      this.session = response as ProgramSession;
      console.log(this.session);
      this.loadContents(0);
    }, err => {
      //Handle Error
      this.session = new ProgramSession;
      this.initialiseDevoteeDisplayParams();
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
      this.attendanceDate.month-1,
      this.attendanceDate.day
    );
    return attendanceDate;
  }

  markAttendanceForDevotee(devoteeId: number, page:number) {
    let attendanceAdd = new AttendanceAdd();
    attendanceAdd.sessionId = this.session.id;
    attendanceAdd.devoteeId = devoteeId;
    //Topic to be added
    this.httpService.post(connectionProperties.markAttendance, attendanceAdd)
    .subscribe(attendanceDetail => {
      //See if it is successful
      this.loadContents(page);
    }, err=> {
      if (err.status == 400) this.statusService.error(JSON.parse(err._body).message);
      else this.statusService.error("Unable to mark attendance");
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
        pathParams: '/' + this.session.id
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

  onBackClick() {
    this.router.navigate(['../../',routeConstants.manageProgram,this.programId], {relativeTo: this.activatedRoute});
  }
}
