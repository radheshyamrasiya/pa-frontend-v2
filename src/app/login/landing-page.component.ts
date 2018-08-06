import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routeConstants } from '../shared/app-properties';

@Component ({
    selector: 'landing-page',
    templateUrl: './landing-page.component.html' 
})

export class LandingPageComponent implements OnInit {

    constructor(
        private router: Router,
    ) {}

    ngOnInit(): void {
    }

    onPrayerBookClick() {
        this.router.navigate([routeConstants.captureContact]);
    }
}