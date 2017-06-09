import { Component, OnInit } from '@angular/core';
import { TitleChecker } from '../services';
import { ActivatedRoute } from '@angular/router';
import { dashboardConfig } from './dashboard.config';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.scss'],
    templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {

    public dashboardConfig: any = {};
    public components: any = {};
    private params: any = {}; // Setup params

    constructor(
        protected _route: ActivatedRoute,
        protected _titleChecker: TitleChecker) {
    }

    ngOnInit() {
        this.dashboardConfig = dashboardConfig;
        this.params = this._route.snapshot.data.params;
        this.components = this.params.components;
        this._titleChecker.setCorrectTitle(this._route, this.params);
    }

}
