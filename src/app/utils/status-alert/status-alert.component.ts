import { Component, OnInit, Input } from '@angular/core';
import { Status, StatusType} from '../../model/status.model';

@Component({
  selector: 'app-status-alert',
  templateUrl: './status-alert.component.html',
})
export class StatusAlertComponent implements OnInit {

  @Input() statusAlert: Status;

  constructor() { }

  ngOnInit() {
    
  }

}
