import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'pages',
    templateUrl: './pages.html'
})
export class Pages implements OnInit {

    public params: any = {};
    public title: string = 'TEST';

    constructor(protected _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.params = this._route.snapshot.data['settings'];
    }
}
