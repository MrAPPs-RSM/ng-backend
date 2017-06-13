import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { GlobalState } from './global.state';
import { ModalHandler } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';

import 'style-loader!./app.scss';
import 'style-loader!./theme/initial.scss';
import { ToastsManager } from 'ng2-toastr';
import { Title } from '@angular/platform-browser';
import { config } from './app.config';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    template: `
        <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
            <div class="additional-bg"></div>
            <router-outlet></router-outlet>
        </main>
    `
})
export class App implements OnInit {

    isMenuCollapsed: boolean = false;

    constructor(vcr: ViewContainerRef,
                private _state: GlobalState,
                private _toastManager: ToastsManager,
                private _modalHandler: ModalHandler,
                private themeConfig: BaThemeConfig,
                private _browserTitleService: Title
    ) {
        this._browserTitleService.setTitle(config.title);
        this._toastManager.setRootViewContainerRef(vcr);
        this._modalHandler.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.themeConfig.config();
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

}
