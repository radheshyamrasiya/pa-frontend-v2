import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { statusType, routeConstants, connectionProperties } from '../shared/app-properties';

import { HttpService } from '../shared/http.service';
import { StatusService } from '../shared/status.service';
import { EnumService } from '../shared/enum.service';
import { LoginSessionService } from '../login/login-session.service';

@Component({
    selector: 'manage-user-account',
    templateUrl: 'manage-user-account.component.html'
})

export class ManageUserAccountComponent implements OnInit {
    devoteeId: number;

    constructor(
        //private modalService: NgbModal,
        private httpService: HttpService,
        private statusService: StatusService,
        //private router: Router,
        //private activatedRoute: ActivatedRoute,
        //public enumService: EnumService,
        public loginService: LoginSessionService,
    ) { }

    ngOnInit() {
        this.loadUsers();        
    }

    loadUsers() {

    }
}