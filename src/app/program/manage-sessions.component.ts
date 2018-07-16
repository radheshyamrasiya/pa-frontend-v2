import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { statusType, routeConstants, connectionProperties } from '../shared/app-properties';
import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';
 
import { ProgramSession, ProgramSessionPage } from '../model/program-session.model';
import { Paging } from '../model/entity.model';

@Component({
  selector: 'app-manage-sessions',
  templateUrl: 'manage-sessions.component.html',
})
export class ManageSessionsComponent implements OnInit {
  //Date Picker data
  attendanceDate;

  programId: number;
  contents: ProgramSessionPage;
  session: ProgramSession;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private modalService: NgbModal,
    private statusService: StatusService,
  ) { }

  ngOnInit() {
    //Setting the Attendance Date Picker of to today's date
    let now = new Date();
    this.attendanceDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };

    //Initializing contents
    this.contents = new ProgramSessionPage();
    this.contents.dataList = [];
    this.contents.paging = new Paging();
    this.contents.paging.first = true;
    this.contents.paging.last = true;

    this.session = new ProgramSession();

    this.activatedRoute.params.subscribe(params => {
      this.programId = +params[routeConstants.paramsProgramId];
      this.loadContents(0);
    });
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

  loadContents(page: number) {
    this.httpService.getList(connectionProperties.getSessionByProgram, {
        page: page,
        pathParams: '/' + this.programId,
        sortString: 'sessionDate,desc'
    })
    .subscribe(sessions => {
        if (sessions!= undefined && sessions!=null) {
          this.contents = sessions as ProgramSessionPage;
          console.log(this.contents);
        } 
    }, err => {
      //
    });
  }

  loadSession() {
    this.httpService.getData(connectionProperties.getSessionByProgramAndDate
      + "/" + this.programId
      + "/" + this.getAttendanceDateFromPicker()
    ).subscribe(session => {
      if (session==undefined) {
        //this.statusService.info("No Session on the selected Date");
      } else {
        this.session = session as ProgramSession;
      }
    }, err => {
      //Handle Error
      this.statusService.error("Error fetching Session, contact admin");
      this.session = new ProgramSession();
    });
  }

  updateSession(content, sessionDate: Date) {
    sessionDate = new Date(sessionDate);
    console.log(this.getAttendanceDateFromPicker());
    this.attendanceDate = {
      year: sessionDate.getFullYear(),
      month: sessionDate.getMonth() + 1,
      day: sessionDate.getDate()
    };
    console.log(this.getAttendanceDateFromPicker());
    this.loadCreateUpdateSession(content);  
  }

  loadCreateUpdateSession(content) {
    this.loadSession();
    this.modalService.open(content).result.then((result) => {
      this.session.programId = this.programId;
      this.session.sessionDate = this.getAttendanceDateFromPicker();
      if (result == 'Create Session') {
        this.httpService.postAndReturnData(connectionProperties.createProgramSession, 
          "", this.session).subscribe(session => {
            //Do someting on success if necessary
            this.loadContents(this.contents.paging.pageNumber);
          }, err=> {
            //do something on error if necessary
          });
      } else if (result == 'Update Session') {
        this.httpService.putAndReturnData(connectionProperties.createProgramSession
          + "/" + this.session.id, 
          "", this.session).subscribe(session => {
            //Do someting on success if necessary
            this.loadContents(this.contents.paging.pageNumber);
          }, err=> {
            //do something on error if necessary
          });
      }
      this.session = new ProgramSession();
    }, (reason) => {
      //Do nothing if the dialog is closed by x button or some other means
    })
  }

  onBackClick() {
    this.router.navigate(['../../',routeConstants.manageProgram,this.programId], {relativeTo: this.activatedRoute});
  }
}
