import { Component, OnInit } from '@angular/core';

import { BaMenuService } from '../theme';

@Component({
    selector: 'pages',
    templateUrl: './pages.html'
})
export class Pages implements OnInit {

    constructor(private _menuService: BaMenuService) {
    }

    ngOnInit() {
        this._menuService.loadMenu();
    }
}
