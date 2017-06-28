import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleChecker, PageRefresh } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { dashboardConfig } from './dashboard.config';
import { BaThemeSpinner } from '../../theme/services';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.scss'],
    templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit, OnDestroy {

    public showDashboard: boolean;
    public dashboardConfig: any = {};
    public components: any = {};
    private params: any = {}; // Setup params

    constructor(protected _router: Router,
                protected _route: ActivatedRoute,
                protected _spinner: BaThemeSpinner,
                protected _titleChecker: TitleChecker,
                protected _pageRefreshService: PageRefresh) {
    }

    ngOnInit() {
        if (this._pageRefreshService.getLastPath() === '/pages/dashboard'
            || isNullOrUndefined(this._pageRefreshService.getLastPath())) {
            this.showDashboard = true;
            this._spinner.hide();
            this.dashboardConfig = dashboardConfig;
            this.params = this._route.snapshot.data['params'];
            this.components = this.params.components;
            this._titleChecker.setCorrectTitle(this._route, this.params);
        } else {
            this.showDashboard = false;
        }
    }

    ngOnDestroy() {
        this._pageRefreshService.setLastPath(this._router.url);
    }
}
