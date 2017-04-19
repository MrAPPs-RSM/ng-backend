import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../../api';
import { List }  from '../list.component';
import { listConfig } from '../list.config';
import { BooleanRender } from '../views';

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
                                /** Rendering filters correctly  */
                                switch (filter.type) {
                                    case listConfig.filters.LIST: { // TODO: table doesn't load filter list
                                        if (filter.config.hasOwnProperty('dataEndpoint')) {
                                            this._apiService
                                                .get(filter.config.dataEndpoint, false)
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
                                    case listConfig.filters.CHECKBOX: {
                                        filter.config = {
                                            true: 1,
                                            false: 0
                                        };
                                    }
                                        break;
                                    default: {
                                    }
                                        break;
                                }
                            }
                        }
                        pResolve();
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
