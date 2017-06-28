import { Component, OnDestroy, OnInit } from '@angular/core';

import 'style-loader!./search.scss';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleChecker } from '../services';
import { BaThemeSpinner, BaMenuService } from '../../theme/services';
import { PageRefresh } from '../services';


@Component({
    selector: 'search',
    templateUrl: './search.html'
})
export class Search implements OnInit, OnDestroy {

    items: any = [];
    results: any = [];
    toSearch: string = '';

    constructor(protected _route: ActivatedRoute,
                protected _router: Router,
                protected _pageRefreshService: PageRefresh,
                protected _spinner: BaThemeSpinner,
                protected _baMenuService: BaMenuService,
                protected _titleChecker: TitleChecker) {
    }

    ngOnInit() {
        this._spinner.hide();
        this._route.params.subscribe(params => {
            this.toSearch = params['value'];
            this._titleChecker.setTitle('Search: "' + this.toSearch + '"');
            this.results = [];
            this.search();
        });
    }

    ngOnDestroy() {
        this._pageRefreshService.setLastPath(this._router.url);
    }

    search(): any {
        this.prepareItems();
        this.items.map((item) => {
            if (item.title.toLowerCase().indexOf(this.toSearch.toLowerCase()) !== -1
            || (item.father && item.father.toLowerCase().indexOf(this.toSearch.toLowerCase()) !== -1)) {
                this.results.push(item);
            }
        });
    }

    prepareItems(): void {
        if (this.items.length <= 0) {
            this._baMenuService.menuItems.value.forEach((item) => {
                if (item.title && item.sidebar === true) {
                    if (item.children) {
                        item.children.forEach((child) => {
                            if (child.title && child.sidebar === true) {
                                this.items.push({
                                    father: item.title,
                                    title: child.title,
                                    path: child.route.path
                                });
                            }
                        });
                    } else {
                        this.items.push({
                            title: item.title,
                            path: item.route.path
                        });
                    }
                }
            });
        }
    }

    onResultClick(item: any): void {
        this._router.navigate(['pages/' + item.path]);
    }
}
