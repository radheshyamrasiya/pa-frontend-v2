import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routeConstants } from '../shared/app-properties';

@Component({
    selector: 'super-admin-component',
    templateUrl: 'super-admin.component.html',
})

export class SuperAdminComponent implements OnInit {
    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    onCreateYatraClick() {
        this.router.navigate([routeConstants.superAdmin, routeConstants.createYatra]);
    }

    onListYatraClick() {
        this.router.navigate([routeConstants.superAdmin, routeConstants.listYatra]);
    }
}