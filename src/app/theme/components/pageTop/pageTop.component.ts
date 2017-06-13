import { Component, Input, OnInit } from '@angular/core';
import { GlobalState } from '../../../global.state';

import 'style-loader!./pageTop.scss';
import { AuthService } from '../../../auth';

@Component({
    selector: 'page-top',
    templateUrl: './pageTop.html',
})
export class PageTop implements OnInit {

    @Input() title: string;

    public isScrolled: boolean = false;
    public isMenuCollapsed: boolean = false;

    constructor(private _state: GlobalState, private _authService: AuthService) {
    }

    ngOnInit() {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    public logout() {
        this._authService.logout();
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
