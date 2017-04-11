import { Injectable } from '@angular/core';

import { config } from '../app.config';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class SetupService {
    apiEndpoint = 'setup';

    constructor(private _router: Router, private _apiService: ApiService) {
    }

    public setup(): Observable<any> {
        return this._apiService.get(this.apiEndpoint);
    }

    public updateRoutes(data: any[]){

        let routerConfig = this._router.config;
        let pages = routerConfig[2].children;

        data[0].children.map(function (item) {

            if (item.type === config.moduleTypes.group) {

                if (item.children) {
                    item.children.map(function (child) {

                        for (let j = 0; j < pages.length; j++){

                            if (pages[j].path === config.moduleTypes[child.type]) {

                                let path = child.path === 'edit' ? child.path + '/:id' : child.path;
                                let childPage = {
                                    path: item.path + '/' + path,
                                    loadChildren: pages[j].loadChildren,
                                    data: child.params
                                };

                                pages.push(childPage);
                                break;
                            }
                        }
                    });
                }
            } else {

                for (let i = 0; i < pages.length; i++) {

                    if (pages[i].path === config.moduleTypes[item.type]) {

                        let page = {
                            path: item.path,
                            loadChildren: pages[i].loadChildren,
                            data: item.params
                        };

                        pages.push(page);
                        break;
                    }
                }
            }
        });

        // Deleting default pages from config
        pages.splice(1, 3);

        console.log(pages);

        routerConfig[2].children = pages;

        this._router.resetConfig(routerConfig);
    }
}
