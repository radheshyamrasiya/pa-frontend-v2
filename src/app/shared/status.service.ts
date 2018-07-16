import { Injectable, OnInit } from '@angular/core';
import { Subject }     from 'rxjs';

import { Status, StatusType } from '../model/status.model';

@Injectable()
export class StatusService implements OnInit {
    statusPipe = new Subject<Status>();

    constructor() { }

    ngOnInit() {
        
    }

    success(message: string) {
        let status = new Status(message, StatusType.SUCCESS);
        this.statusPipe.next(status);
    }

    error(message: string) {
        let status = new Status(message, StatusType.ERROR);
        this.statusPipe.next(status);
    }

    info(message: string) {
        let status = new Status(message, StatusType.INFO);
        this.statusPipe.next(status);
    }
}