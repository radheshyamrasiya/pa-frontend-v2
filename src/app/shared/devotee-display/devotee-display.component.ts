import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DevoteeDisplayParams } from '../../model/devotee-display.model';

import { HttpService } from '../../shared/http.service';
import { StatusService } from '../../shared/status.service';

@Component({
  selector: 'app-devotee-display',
  templateUrl: './devotee-display.component.html',
})
export class DevoteeDisplayComponent implements OnInit {

  @Input() devoteeDisplayParams: DevoteeDisplayParams;
  @Output() onActionPerformed: EventEmitter<any> = new EventEmitter();
  @Output() quickActionCallback: EventEmitter<any> = new EventEmitter();
  @Output() loadContentsCallback: EventEmitter<any> = new EventEmitter();

  activePanel: string;

  constructor(
    private httpService: HttpService,
    private statusService: StatusService,
  ) { }

  ngOnInit() {
    this.activePanel = "";
  }

  actionPerformed(action: string, devoteeId:number, page:number) {
    this.onActionPerformed.emit([action, devoteeId, page]);
  }

  quickActionPerformed(devoteeId: number, page: number) {
    this.quickActionCallback.emit([devoteeId, page]);
  }

  loadContents(page: number) {
    this.loadContentsCallback.emit([page]);
  }
}
