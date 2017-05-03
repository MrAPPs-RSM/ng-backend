import { Injectable } from '@angular/core';

import { config } from '../app.config';
import { ApiService } from '../api';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class SetupService {

    private apiName: string = 'setup';

    constructor(private _router: Router, private _apiService: ApiService) {
    }

    public setup(): Observable<any> {
        return this._apiService.get(this.apiName, true);
    }

    public loadRoutes(data: BackendData){

        let routerConfig = this._router.config;

        // Pages defined in pages.routing
        let pagesRoute = this.getPages(routerConfig);
        let standardPages = pagesRoute.children;

        // Pages defined from retrieved data
        let apiPages = this.getPages(data.sections).children;

        apiPages.map(function (item) {
            if (item.type === config.moduleTypes.group) {
                if (item.children) {
                    item.children.map(function (child) {
                        for (let j = 0; j < standardPages.length; j++){
                            if (standardPages[j].path === config.moduleTypes[child.type]) {
                                let path = child.path === 'edit' ? child.path + '/:id' : child.path;
                                let childPage = {
                                    path: item.path + '/' + path,
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
                    if (standardPages[i].path === config.moduleTypes[item.type]) {
                        let page = {
                            path: item.path,
                            loadChildren: standardPages[i].loadChildren,
                            data: item.params
                        };
                        standardPages.push(page);
                        break;
                    }
                }
            }
        });

        // Deleting default pages from config
        standardPages.splice(1, 3); // TODO remove 3 and calculate automatically standard pages count
        pagesRoute.children = standardPages;
        pagesRoute.data = {
            title: data.title
        };

        routerConfig[2] = pagesRoute;

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
    title: string;
    sections: any[];
}
