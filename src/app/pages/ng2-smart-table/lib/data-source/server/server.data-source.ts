import { LocalDataSource } from '../local/local.data-source';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ToastHandler } from '../../../../../theme/services';
import { ApiService } from '../../../../../api';
import { isNullOrUndefined } from 'util';

export class ServerDataSource extends LocalDataSource {

    protected data: Array<any> = [];

    protected sortConf: Array<any> = [];

    protected filterConf: any = {
        filters: [],
        andOperator: true,
    };

    protected pagingConf: any = {};

    protected isLoading: boolean = false;

    protected conf: any = {
        api: {
            endpoint: '',
            fixedQueryParam: null,
        },
        sortKey: 'order',
        skipKey: 'skip',
        limitKey: 'limit',
        whereKey: 'where',
    };

    protected lastRequestCount: number = 0;

    constructor(
        protected _toastHandler: ToastHandler,
        protected _route: ActivatedRoute,
        protected _apiService: ApiService,
        protected apiConfig: any,
        protected enableDrag: boolean) {
        super();

        this.conf.api = apiConfig;

        if (!this.conf.api.endpoint) {
            throw new Error('At least endPoint must be specified as a configuration of the server data source.');
        }

        super.refresh();
    }

    count(): number {
        return this.lastRequestCount;
    }

    getElements(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._apiService.get(
                this.conf.api.endpoint + '/count',
                this.createCountRequestOptions(),
            ).subscribe(
                res => {
                    this.lastRequestCount = res.count;
                    this._apiService.get(
                        this.conf.api.endpoint,
                        this.createDataRequestOptions()
                    ).subscribe(
                        data => {
                            this.data = data;
                            resolve(this.data);
                        },
                        error => {
                            reject(error);
                        }
                    );
                },
                error => {
                    reject(error);
                }
            );
        });
    }

    protected createCountRequestOptions(): RequestOptionsArgs {
        let requestOptions = {
            search: new URLSearchParams()
        };


        /** FIXED FILTER */
        let sumToIndex = false;
        if (this.conf.api.fixedQueryParam) {
            let urlParams = this._route.snapshot.params;
            if (urlParams && urlParams['id']) {
                let fixedCondition = '[where][and][0][' + this.conf.api.fixedQueryParam + ']';
                requestOptions.search.set(fixedCondition, urlParams['id']);
                sumToIndex = true;
            }
        }

        /** FILTERS */
        if (this.filterConf.filters.length) {

            this.filterConf.filters.forEach((fieldConf: any, index: number) => {
                if (fieldConf.search) {
                    let whereCondition = '';
                    let correctIndex = sumToIndex === true ? index + 1 : index;
                    if (fieldConf.search.indexOf('(bool)') !== -1) {
                        let whereValue = fieldConf.search.substring(6) === '1';
                        whereCondition = '[where][and][' + correctIndex + '][' + whereValue + ']';
                        requestOptions.search.set(whereCondition, fieldConf.search);
                    } else {
                        whereCondition = '[where][and][' + correctIndex + '][' + fieldConf.field + '][like]';
                        requestOptions.search.set(whereCondition, '%' + fieldConf.search + '%');
                    }
                }
            });
        }

        return requestOptions;
    }

    protected createDataRequestOptions(): RequestOptionsArgs {
        let requestOptions = {
            search: new URLSearchParams()
        };

        let filterOptions = {};

        /** SORTING (if drag enabled, always sort by weight ascending */
        if (this.enableDrag === true) {
            filterOptions[this.conf.sortKey] = 'weight ASC';
        } else {
            if (this.sortConf) {
                this.sortConf.forEach((fieldConf) => {
                    filterOptions[this.conf.sortKey] = fieldConf.field + ' ' + fieldConf.direction.toUpperCase();
                });
            }
        }

        filterOptions[this.conf.whereKey] = {
            and: []
        };

        /** FIXED FILTER */
        if (this.conf.api.fixedQueryParam) {
            let urlParams = this._route.snapshot.params;
            if (urlParams && urlParams['id']) {
                let condition = {};
                condition[this.conf.api.fixedQueryParam] = urlParams['id'];
                filterOptions[this.conf.whereKey].and.push(condition);
            }
        }

        /** FILTERS */
        if (this.filterConf.filters.length) {
            this.filterConf.filters.forEach((fieldConf: any) => {
                if (fieldConf.search) {

                    let condition = {};

                    if (fieldConf.search.indexOf('(bool)') !== -1) {
                        condition[fieldConf.field] = fieldConf.search.substring(6) === '1';
                    } else {
                        condition[fieldConf.field] = {
                            like: '%' + fieldConf.search + '%'
                        };
                    }
                    filterOptions[this.conf.whereKey].and.push(condition);
                }
            });
        }

        /** PAGINATION */
        if (this.pagingConf && this.pagingConf.page && this.pagingConf.perPage) {
            filterOptions[this.conf.skipKey] = (this.pagingConf.page - 1) * this.pagingConf.perPage;
            filterOptions[this.conf.limitKey] = this.pagingConf.perPage;
        }

        requestOptions.search.set('filter', JSON.stringify(filterOptions));
        return requestOptions;
    }

    protected refreshData(action: string): void {
        if (!this.isLoading) {
            this.isLoading = true;

            this.getElements().then((elements) => {
                this.onChangedSource.next({
                    action: action,
                    elements: elements,
                    paging: this.getPaging(),
                    filter: this.getFilter(),
                    sort: this.getSort(),
                });

                this.isLoading = false;
            }).catch((error) => {
                this._toastHandler.error(error);
            });
        }
    }

    protected emitOnChanged(action: string): void {
        this.refreshData(action);
    }
}
