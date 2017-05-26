import { Component, OnInit } from '@angular/core';
import { TitleChecker } from '../services';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.scss'],
    templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {

    params: any = {}; // Setup params

    constructor(
        protected _route: ActivatedRoute,
        protected _titleChecker: TitleChecker) {
    }

    ngOnInit() {
        this.params = {
            menu: {
                title: 'Dashboard',
                breadcrumbLevel: 1
            }
        };
        this._titleChecker.setCorrectTitle(this._route, this.params);
    }

}
