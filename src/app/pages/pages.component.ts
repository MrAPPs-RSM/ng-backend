import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { config } from '../app.config';
import { PageRefresh } from './services';

@Component({
    selector: 'pages',
    templateUrl: './pages.html'
})
export class Pages implements OnInit {

    public title: string;
    public icon: string;

    constructor(protected _router: Router,
                protected _pageRefreshService: PageRefresh) {
        this.title = config.title;
        this.icon = config['icon'] ? config['icon'] : null;
    }

    ngOnInit() {
        if (this._pageRefreshService.getLastPath() !== null) {
            this._pageRefreshService.renavigate();
        }
    }
}
