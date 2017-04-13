import { Http } from '@angular/http';
import { LocalDataSource } from 'ng2-smart-table';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { getDeepFromObject } from 'ng2-smart-table/lib/helpers';

export class ServerDataSource extends LocalDataSource {

  protected data: Array<any> = [];

  protected sortConf: Array<any> = [];

  protected filterConf: any = {
    filters: [],
    andOperator: true,
  };

  protected pagingConf: any = {};

  protected timeoutHandler: any;
  protected isLoading = false;

  protected conf: any = {
    endPoint: '',
    sortFieldKey: '_sort',
    sortDirKey: '_order',
    pagerPageKey: '_page',
    pagerLimitKey: '_limit',
    filterFieldKey: '#field#_like',
    totalKey: 'x-total-count',
    dataKey: 'data',
  };

  protected lastRequestCount: number = 0;

  constructor(protected _http: Http, endPoint: string) {
    super();

    this.conf.endPoint = endPoint;

    if (!this.conf.endPoint) {
      throw new Error('At least endPoint must be specified as a configuration of the server data source.');
    }

    super.refresh();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    return this.requestElements().map(res => {
      this.lastRequestCount = this.extractTotalFromResponse(res);
      this.data = this.extractDataFromResponse(res);

      return this.data;
    }).toPromise();
  }

  /**
   * Extracts array of data from server response
   * @param res
   * @returns {any}
   */
  protected extractDataFromResponse(res: any): Array<any> {
    const rawData = res.json();
    let data = this.conf.dataKey ? getDeepFromObject(rawData, this.conf.dataKey, []) : rawData;

    if (data instanceof Array) {
      return data;
    }

    throw new Error(`Data must be an array.
     Please check that data extracted from the server response by the key
      '${this.conf.dataKey}' exists and is array.`);
  }

  /**
   * Extracts total rows count from the server response
   * Looks for the count in the headers first, then in the response body
   * @param res
   * @returns {any}
   */
  protected extractTotalFromResponse(res: any): number {
      return 50;
    if (res.headers.has(this.conf.totalKey)) {
      return +res.headers.get(this.conf.totalKey);
    } else {
      const rawData = res.json();
      return getDeepFromObject(rawData, this.conf.totalKey, 0);
    }
  }

  protected requestElements(): Observable<any> {
    return this._http.get(this.conf.endPoint, this.createRequestOptions());
  }

  protected createRequestOptions(): RequestOptionsArgs {
    let requestOptions: RequestOptionsArgs = {};
    requestOptions.search = new URLSearchParams();

    requestOptions = this.addSortRequestOptions(requestOptions);
    requestOptions = this.addFilterRequestOptions(requestOptions);
    return this.addPagerRequestOptions(requestOptions);
  }

  protected addSortRequestOptions(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
    let searchParams: URLSearchParams = <URLSearchParams> requestOptions.search;

    if (this.sortConf) {
      this.sortConf.forEach((fieldConf) => {
        searchParams.set(this.conf.sortFieldKey, fieldConf.field);
        searchParams.set(this.conf.sortDirKey, fieldConf.direction.toUpperCase());
      });
    }

    return requestOptions;
  }

  protected addFilterRequestOptions(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
    let searchParams: URLSearchParams = <URLSearchParams> requestOptions.search;

    if (this.filterConf.filters) {
      this.filterConf.filters.forEach((fieldConf: any) => {
        if (fieldConf['search']) {
          searchParams.set(this.conf.filterFieldKey.replace('#field#', fieldConf['field']), fieldConf['search']);
        }
      });
    }

    return requestOptions;
  }

  protected addPagerRequestOptions(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
    let searchParams: URLSearchParams = <URLSearchParams> requestOptions.search;

    if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
      searchParams.set(this.conf.pagerPageKey, this.pagingConf['page']);
      searchParams.set(this.conf.pagerLimitKey, this.pagingConf['perPage']);
    }

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
      });
    }
  }

  protected emitOnChanged(action: string): void {

    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
    }
    this.timeoutHandler = setTimeout(() => {
      this.refreshData(action);
    }, action !== 'refresh' ? 500 : 0);
  }
}
