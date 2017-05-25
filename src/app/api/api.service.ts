import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { config } from '../app.config';
import { isNullOrUndefined } from 'util';

@Injectable()
export class ApiService {

    config: any = config.env === 'dev' ? config.api.dev : config.api.prod;
    options: any = {
        headers: null,
        search: null
    };

    static extractData(res: Response): Object {
        return res.json() || {};
    }

    static handleError(error: Response): Observable<any> {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = err['message'] ? err['message'] : String(err);
        return Observable.throw(errMsg);
    }

    constructor(protected _http: Http) {
        this.options.headers = new Headers();
        this.options.search = new URLSearchParams();

        this.options.headers.append('Content-Type', 'application/json');

        if (localStorage.getItem('access_token') !== null) {
            this.options.search.set('access_token', localStorage.getItem('access_token'));
        }
    }

    /**
     * Set headers (reset all headers)
     * @param headers
     */
    public setHeaders(headers: any[]): void {
        this.options.headers = new Headers();
        headers.forEach(header => {
            this.options.headers.append(
                header.name,
                header.value
            );
        });
    }

    /**
     * Add headers
     * @param headers
     */
    public addHeaders(headers: any[]): void {
        headers.forEach(header => {
            this.options.headers.append(
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
        let url: string = this.config.baseUrl + this.config.api[apiName];
        return !isNullOrUndefined(options) && options !== '' ? url + options : url;
    }

    /**
     * POST file request
     * @param apiEndpoint
     * @param file
     * @returns {Observable<R>}
     */
    public postFile(apiEndpoint: string, file: any): Observable<any> {
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers;
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});
        return this._http.post(apiEndpoint, formData, options)
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
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
                this.options
            )
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
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
                this.options
            )
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
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
                this.options
            )
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
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
                this.options
            )
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
    }

    public getHttp(): Http {
        return this._http;
    }

    public getComposedUrl(apiName: string): string {
        return this.composeUrl(apiName);
    }
}
