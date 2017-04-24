import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { config } from '../app.config';
import { isNullOrUndefined } from 'util';

@Injectable()
export class ApiService {

    config = config.env === 'dev' ? config.api.dev : config.api.prod;
    headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private _http: Http) {
    }

    /**
     * Set headers
     * @param headers
     */
    public setHeaders(headers: any[]): void {
        headers.forEach(header => {
            this.headers.append(
                header.name,
                header.value
            );
        });
    }

    /**
     * Return composed url based on ENV
     * @param apiName
     * @param options
     * @returns {string}
     */
    protected composeUrl(apiName: string, options?: string): string {
        let url = this.config.baseUrl + this.config.api[apiName];
        return !isNullOrUndefined(options) && options !== '' ? url + options : url;
    }

    /**
     * GET request
     * @param apiName
     * @param composeUrl
     * @param options
     * @returns {Observable<R>}
     */
    public get(apiName: string, composeUrl: boolean, options?: string): Observable<any> {
        return this._http
            .get(
                composeUrl === true ? this.composeUrl(apiName, options) : apiName,
                this.headers
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * POST request
     * @param apiName
     * @param body
     * @param composeUrl
     * @param options
     * @returns {Observable<R>}
     */
    public post(apiName: string, body: any, composeUrl: boolean, options?: string): Observable<any> {
        return this._http
            .post(
                composeUrl === true ? this.composeUrl(apiName, options) : apiName,
                body,
                this.headers
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * PUT request
     * @param apiName
     * @param body
     * @param composeUrl
     * @param options
     * @returns {Observable<R>}
     */
    public put(apiName: string, body: any, composeUrl: boolean, options?: string): Observable<any> {
        return this._http
            .put(
                composeUrl === true ? this.composeUrl(apiName, options) : apiName,
                body,
                this.headers
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * DELETE request
     * @param apiName
     * @param composeUrl
     * @param options
     * @returns {Observable<R>}
     */
    public delete(apiName: string, composeUrl: boolean, options?: string): Observable<any> {
        return this._http
            .delete(
                composeUrl === true ? this.composeUrl(apiName, options) : apiName,
                this.headers
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    protected extractData(res: Response): Object {
        return res.json() || {};
    }

    protected handleError(error: Response): Observable<any> {
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
