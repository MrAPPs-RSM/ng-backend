import { Injectable } from '@angular/core';
import { GlobalState } from '../../global.state';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class TitleChecker {

    constructor(
        protected _state: GlobalState,
        protected _router: Router
    ) {}

    public setCorrectTitle(route: ActivatedRoute, params: any): void {
        let urlParams = route.snapshot.params;
        let activeLink = {
            title: urlParams && urlParams['id'] ? params.menu.title + ' ' + urlParams['id'] : params.menu.title,
            route: this._router.url,
            breadcrumbLevel: params.menu.breadcrumbLevel
        };
        this._state.notifyDataChanged('menu.activeLink', activeLink);

    }
}
