import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../../api';
import { List }  from '../list.component';
import { listConfig } from '../list.config';
import { BooleanRender, DateRender, ImageRender, ColorRender } from '../views';

@Injectable()
export class ListResolver implements Resolve<List> {

    constructor(private _apiService: ApiService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.loadColumns(route.data['table']);
    }

    loadColumns(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let requests = [];
            for (let key in params.columns) {
                if (params.columns.hasOwnProperty(key)) {

                    /** Rendering view cells correctly  */
                    switch (params.columns[key].type) {
                        case listConfig.types.BOOLEAN: {
                            params.columns[key].type = listConfig.types.CUSTOM;
                            params.columns[key].renderComponent = BooleanRender;
                            if (!params.columns.filter) {
                                params.columns[key].filter = {
                                    type: 'checkbox',
                                    config: {
                                        true: '(bool)1',
                                        false: '(bool)0',
                                        resetText: 'reset'
                                    }
                                };
                            }
                        }
                            break;
                        case listConfig.types.DATE: {
                            params.columns[key].type = listConfig.types.CUSTOM;
                            params.columns[key].renderComponent = DateRender;
                        }
                            break;
                        case listConfig.types.IMAGE: {
                            params.columns[key].type = listConfig.types.CUSTOM;
                            params.columns[key].renderComponent = ImageRender;
                        }
                            break;
                        case listConfig.types.COLOR: {
                            params.columns[key].type = listConfig.types.CUSTOM;
                            params.columns[key].renderComponent = ColorRender;
                        }
                            break;
                        default: {
                        }
                            break;
                    }

                    let filterPromise = new Promise((pResolve, pReject) => {
                        if (params.columns[key].hasOwnProperty('filter')) {
                            let filter = params.columns[key].filter;
                            if (filter !== false) {
                                switch (filter.type) {
                                    case listConfig.filters.LIST: {
                                        if (filter.config.hasOwnProperty('dataEndpoint')) {
                                            this._apiService
                                                .get(filter.config.dataEndpoint)
                                                .subscribe(
                                                    data => {
                                                        filter.config.list = data;
                                                        delete filter.config.dataEndpoint;
                                                        pResolve();
                                                    },
                                                    error => {
                                                        pReject(error);
                                                    }
                                                );
                                        } else {
                                            pResolve();
                                        }
                                    }
                                        break;
                                    default: {
                                        pResolve();
                                    }
                                        break;
                                }
                            } else {
                                pResolve();
                            }
                        } else {
                            pResolve();
                        }
                    });
                    requests.push(filterPromise);
                }
            }

            Promise.all(requests)
                .then(function () {
                    resolve(params);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }
}
