import { Component, Input, OnInit } from '@angular/core';

import 'style-loader!./simpleStats.scss';
import { ToastHandler } from '../../../theme/services';
import { ApiService } from '../../../api';

@Component({
    selector: 'simple-stats',
    templateUrl: './simpleStats.html'
})

export class SimpleStats implements OnInit {

    @Input() config: any;

    private items: any = [];

    constructor(protected _apiService: ApiService,
                protected _toastManager: ToastHandler) {
    }

    ngOnInit() {
        this.loadItems()
            .then((items) => {
                this.items = items;
            })
            .catch((error) => {
                this._toastManager.error(error);
            });
    }

    private loadItems(): Promise<any> {
        return new Promise((resolve, reject) => {
            let result = [];
            let promises = this.config.items.map((item) => {
                return new Promise((pResolve, pReject) => {
                    if (item.stats instanceof Object) {
                        result.push(item);
                        pResolve();
                    } else {
                        this._apiService.get(item.stats)
                            .subscribe(
                                data => {
                                    item.stats = {data: data};
                                    result.push(item);
                                    pResolve();
                                },
                                error => {
                                    pReject(error);
                                }
                            );
                    }
                });
            });

            Promise.all(promises)
                .then(() => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
