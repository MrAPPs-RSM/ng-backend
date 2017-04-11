import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { config } from '../app.config';

@Injectable()
export class ApiService {

    config = config.env === 'dev' ? config.api.dev : config.api.prod;
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    constructor(private _http: Http) {
    }

    protected composeUrl(apiEndpoint: string) {
        return this.config.baseUrl + this.config.api[apiEndpoint];
    }

    /**
     * GET request
     * @param apiEndpoint
     * @returns {Observable<R>}
     */
    public get(apiEndpoint: string): Observable<any> {
        return this._http
            .get(this.composeUrl(apiEndpoint))
            .map(this.extractData)
            .catch(this.handleError);
    };

    /**
     * POST request
     * @param apiEndpoint
     * @returns {Observable<R>}
     */
    public post(apiEndpoint: string): Observable<any> {

        return this._http
            .post(this.composeUrl(apiEndpoint), this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * PUT request
     * @param apiEndpoint
     * @returns {Observable<R>}
     */
    public put(apiEndpoint: string): Observable<any> {

        return this._http
            .put(this.composeUrl(apiEndpoint), this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * DELETE request
     * @param apiEndpoint
     * @returns {Observable<R>}
     */
    public delete(apiEndpoint: string): Observable<any> {

        return this._http
            .delete(this.composeUrl(apiEndpoint), this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    protected extractData(res: Response) {
        return res.json() || {};
    }

    protected handleError(error: Response) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error['message'] ? error['message'] : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
