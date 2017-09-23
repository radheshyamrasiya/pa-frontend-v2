import { Component, OnInit } from "@angular/core";

import { DevoteeMin } from '../model/devotee.model';
import { CaptureSessionService } from './capture-session.service';


@Component ({
    selector: "capture-contact",
    templateUrl: "./capture-contact.component.html",
})

export class CaptureContactComponent implements OnInit {
    devotee: DevoteeMin;
    name;

    constructor(private captureSession: CaptureSessionService) {}

    ngOnInit() {
        this.devotee = new DevoteeMin();
    }
    
    onCaptureClick(): void {
        if (this.devotee.name != "" && this.devotee.phone!="") {
            this.captureSession.addCapturedDevotee(this.devotee);
        }
    }
}