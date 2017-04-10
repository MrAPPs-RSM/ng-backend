import { Component } from '@angular/core';

import { BaMenuService } from '../theme';

@Component({
    selector: 'pages',
    templateUrl: './pages.html'
})
export class Pages {

    constructor(private _menuService: BaMenuService) {
    }

    ngOnInit() {
        this._menuService.loadMenu();
    }
}
