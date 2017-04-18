import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
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

    protected composeUrl(apiName: string) {
        return this.config.baseUrl + this.config.api[apiName];
    }

    /**
     * GET request
     * @param apiName
     * @param composeUrl
     * @returns {Observable<R>}
     */
    public get(apiName: string, composeUrl: boolean): Observable<any> {
        return this._http
            .get(composeUrl === true ? this.composeUrl(apiName) : apiName)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * POST request
     * @param apiName
     * @param composeUrl
     * @returns {Observable<R>}
     */
    public post(apiName: string, composeUrl: boolean): Observable<any> {
        return this._http
            .post(composeUrl === true ? this.composeUrl(apiName) : apiName, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * PUT request
     * @param apiName
     * @param composeUrl
     * @returns {Observable<R>}
     */
    public put(apiName: string, composeUrl: boolean): Observable<any> {
        return this._http
            .put(composeUrl === true ? this.composeUrl(apiName) : apiName, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * DELETE request
     * @param apiName
     * @param composeUrl
     * @returns {Observable<R>}
     */
    public delete(apiName: string, composeUrl: boolean): Observable<any> {
        return this._http
            .delete(composeUrl === true ? this.composeUrl(apiName) : apiName, this.options)
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
            errMsg = error['message'] ? error['message'] : String(error);
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    public getHttp(): Http {
        return this._http;
    }

    public getComposedUrl(apiName: string): string {
        return this.composeUrl(apiName);
    }
}
