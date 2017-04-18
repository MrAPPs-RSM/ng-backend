import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../../api';
import { List }  from '../list.component';
import { listTypes } from '../list.types';
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
            let columns = params.columns;
            let requests = [];
            for (let key in columns) {
                if (columns.hasOwnProperty(key)) {

                    switch (columns[key].type) {
                        case listTypes.boolean: {
                            columns[key].type = listTypes.custom;
                            columns[key].renderComponent = BooleanRender;
                        }
                            break;
                        default: {
                        }
                            break;
                    }

                    let filterPromise = new Promise((pResolve, pReject) => {
                        if (columns[key].hasOwnProperty('filter')) {
                            let filter = columns[key].filter;
                            if (filter !== false) {
                                switch (filter.type) {
                                    case listTypes.list: {
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
                    resolve(columns);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }
}
