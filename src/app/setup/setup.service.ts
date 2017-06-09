import { Injectable } from '@angular/core';

import { pageTypes } from './pageTypes';
import { ApiService } from '../api';
import { Router } from '@angular/router';
import { BaMenuService } from '../theme/services';
import { AuthService } from '../auth';

@Injectable()
export class SetupService {

    private endpoint: string = 'setup';

    constructor(private _router: Router,
                private _authService: AuthService,
                private _apiService: ApiService,
                private _baMenuService: BaMenuService) {
    }

    public setup(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._apiService.get(
                this.endpoint
            )
                .subscribe(
                    data => {
                        this.loadRoutes(data);
                        this._baMenuService.loadSidebar(data);
                        resolve(data.settings);
                    },
                    error => {
                        // Might never happen, in case, logout the user
                        this._authService.logout();
                    }
                );
        });
    }

    public loadRoutes(data: BackendData) {
        console.log('[SETUP SERVICE]: Loading routes...');

        // TODO handle more complicated paths

        let routerConfig = this._router.config;

        // Pages defined in pages.routing
        let pagesRoute = this.getPages(routerConfig);
        let standardPages = pagesRoute.children;

        // Pages defined from retrieved data
        let apiPages = this.getPages(data.sections).children;

        apiPages.map((item) => {
            if (item.type === pageTypes.group) {
                if (item.children) {
                    item.children.map((child) => {
                        for (let j = 0; j < standardPages.length; j++) {
                            if (standardPages[j].path === pageTypes[child.type]) {
                                let childPage = {
                                    path: item.path + '/' + child.path,
                                    loadChildren: standardPages[j].loadChildren,
                                    data: child.params
                                };
                                standardPages.push(childPage);
                                break;
                            }
                        }
                    });
                }
            } else {
                for (let i = 0; i < standardPages.length; i++) {
                    if (standardPages[i].path === pageTypes[item.type]) {
                        let page = {
                            path: item.path,
                            loadChildren: standardPages[i].loadChildren,
                            data: item.params
                        };
                        standardPages.push(page);
                        if (pageTypes[item.type] === 'dashboard') {
                            // TODO handle better this
                            localStorage.setItem('dashboard', JSON.stringify(item.params));
                        }
                        break;
                    }
                }
            }
        });

        // Deleting default pages from config
        standardPages.splice(1, 3);
        pagesRoute.children = standardPages;
        routerConfig[1] = pagesRoute;

        console.log(routerConfig);
        this._router.resetConfig(routerConfig);
    }

    private getPages(array: any[]): any {
        let pages = {};
        array.forEach(item => {
            if (item.path === 'pages') {
                pages = item;
            }
        });
        return pages;
    }
}

// Interface for type safety
interface BackendData {
    settings: {
        title?: string
    },
    sections: any[];
}
