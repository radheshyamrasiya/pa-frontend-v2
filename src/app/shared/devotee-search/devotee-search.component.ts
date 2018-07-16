import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { routeConstants, connectionProperties } from '../app-properties';
import { Paging, DBQueryParams } from '../../model/entity.model';
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


  // passed by calling component to define the
  // params for search context. It is an object
  // which is used as query params in the search api
  @Input() searchContextParams: any;

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
    if (this.searchText === '') {
        this.contents.dataList = [];
        return;
    }

    const url = `${connectionProperties.devoteeSearch}`;
    this.searchContextParams = this.searchContextParams || {};
    const queryParams = Object.assign({q: this.searchText},
      this.searchContextParams);
    console.log('Search context params in devotee search');
    console.log(this.searchContextParams);
    const params = {
      queryParams: queryParams,
      page: 0,
      pageSize: 5
    };
    this.httpService.getList(url, <DBQueryParams>params)
      .subscribe((devoteePage) => {
        this.contents = devoteePage;
      });
  }

  actionPerformed(devoteeId:number) {
    this.onActionPerformed.emit([devoteeId]);
  }
}
