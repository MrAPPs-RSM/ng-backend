import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GlobalState } from '../../../global.state';

import 'style-loader!./pageTop.scss';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { Logout } from '../../../auth';

@Component({
    selector: 'page-top',
    templateUrl: './pageTop.html',
})
export class PageTop implements OnInit {

    @Input() title: string;
    @Input() icon: string;
    @ViewChild('searchInput') searchInput;

    public isSearchClicked: boolean = false;
    public isScrolled: boolean = false;
    public isMenuCollapsed: boolean = false;

    constructor(private _state: GlobalState,
                private _router: Router,
                private _logout: Logout) {
    }

    ngOnInit() {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    public logout() {
        this._logout.logout();
    }

    public search(iconClick?: boolean) {
        let value = this.searchInput.nativeElement.value;
        if (value !== '' && !isNullOrUndefined(value)) {
            this._router.navigate(['pages/search/' + value.toLowerCase()]);
        } else {
            if (iconClick === true) {
                this.isSearchClicked = !this.isSearchClicked;
            }
        }
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    }

    public scrolledChanged(isScrolled) {
        this.isScrolled = isScrolled;
    }
}
