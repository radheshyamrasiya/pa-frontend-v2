import { Component, OnInit } from '@angular/core';

@Component ({
    selector: 'landing-page',
    template: `<div class="row justify-content-md-center p-5">
            <div class="col" max-width="100px">
                <img src="../../assets/sacredprayer_welcome.png" class="img-fluid" alt="A prayer can make a difference">
            </div>
        </div>
        `
})

export class LandingPageComponent implements OnInit {

    constructor(
    ) {}

    ngOnInit(): void {
    }
}