import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaThemeSpinner } from '../theme/services';
import { config } from '../app.config';

@Component({
    selector: 'pages',
    templateUrl: './pages.html'
})
export class Pages implements OnInit {

    public title: string;
    public icon: string;
    public params: any = {};

    constructor(protected _route: ActivatedRoute,
                protected _spinner: BaThemeSpinner) {
        this.title = config.title;
        this.icon = config['icon'] ? config['icon'] : null;
    }

    ngOnInit() {
        this._spinner.hide();
        this.params = this._route.snapshot.data['settings'];
    }
}
