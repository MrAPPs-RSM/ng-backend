import { Component, OnInit } from '@angular/core';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';

import 'style-loader!./app.scss';
import 'style-loader!./theme/initial.scss';
import { SetupService } from './setup';
import { BaThemeSpinner } from './theme/services';

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

    constructor(private _state: GlobalState,
                private _imageLoader: BaImageLoaderService,
                private themeConfig: BaThemeConfig,
                private _setupService: SetupService,
                private _spinner: BaThemeSpinner) {}

    ngOnInit() {
        this._setupService.setup()
            .then(() => {
                this._spinner.hide();
            });
        this.themeConfig.config();
        this._loadImages();
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    private _loadImages(): void {
        // register some loaders
        BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
    }

}
