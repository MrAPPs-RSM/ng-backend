import { Injectable } from '@angular/core';
import { GlobalState } from '../../global.state';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class TitleChecker {

    constructor(protected _state: GlobalState,
                protected _router: Router) {
    }

    public setCorrectTitle(route: ActivatedRoute, params: any): void {
        let urlParams = route.snapshot.params;
        let title = params.menu.title;
        if (urlParams) {
            if (urlParams['title']) {
                title += ' ' + urlParams['title'];
            } else if (urlParams['id']) {
                title += ' ' + urlParams['id'];
            }
        }
        let activeLink = {
            title: title,
            route: this._router.url,
            breadcrumbLevel: params.menu.breadcrumbLevel
        };
        this._state.notifyDataChanged('menu.activeLink', activeLink);
    }

    public setTitle(title: string): void {
        this._state.notifyDataChanged('menu.activeLink', {title: title});
    }
}
