import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { routeConstants, connectionProperties } from '../app-properties';
import { Paging } from '../../model/entity.model';
import { Devotee, DevoteeMinPage, DevoteeMin } from '../../model/devotee.model';

import { HttpService } from '../http.service';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-devotee-search',
  templateUrl: './devotee-search.component.html',
})
export class DevoteeSearchComponent implements OnInit {

  contents: DevoteeMinPage;
  searchText: string;

  //global, program, yatra, myCaptureList
  @Input() searchType: string;

  //Incase of program or yatra search
  @Input() programId: number;

  //Define the search purpose so that 
  //already existing records can be 
  //identified and displayed differently
  @Input() searchPurpose: number;

  //Action call back for from the parent component
  @Input() actionButtonText: string;

  @Output() onActionPerformed: EventEmitter<any> = new EventEmitter();

  //Bulk action enabled or disabled
  //@Input() bulkActionCallBack: (devoteeId: number[]) => null;

  constructor(
        private httpService: HttpService,
        private statusService: StatusService,
  ) { }

  ngOnInit() {
    this.contents = new DevoteeMinPage();
    this.contents.dataList = [];
    this.contents.paging = new Paging();
  }

  textChange() {

    let queryUrl: string;

    if (this.searchText === '') {
        this.contents.dataList = [];
        return;
    }
    
    switch(this.searchType) {
      case 'program': 
        //Program search impl;
        break;
      case 'yatra':
        //TODO: Yatra search impl;
        break;
      case 'myCapturedList':
        //TODO: My Captured List search impl;
        break; 
      case 'global':
        queryUrl = connectionProperties.devoteeGlobalSearch + 
        "/" + this.searchText;
        break;
      default:
        queryUrl = "";
    }

    if (queryUrl != "") {
      this.httpService.getList(queryUrl)
      .subscribe(devoteePage => {
          this.contents = devoteePage;
      });
    }
  }

  actionPerformed(devoteeId:number) {
    this.onActionPerformed.emit([devoteeId]);
  }
}