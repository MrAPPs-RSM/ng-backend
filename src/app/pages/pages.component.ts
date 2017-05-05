import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaThemeSpinner } from '../theme/services';

@Component({
    selector: 'pages',
    templateUrl: './pages.html'
})
export class Pages implements OnInit {

    public params: any = {};

    constructor(protected _route: ActivatedRoute, protected _spinner: BaThemeSpinner) {
    }

    ngOnInit() {
        this._spinner.hide();
        console.log('Pages component');
        this.params = this._route.snapshot.data['settings'];
    }
}
