import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { config } from '../app.config';

@Injectable()
export class ApiService {

    config: any = config.env === 'dev' ? config.api.dev : config.api.prod;
    headers: Headers;

    static extractData(res: Response): Object {
        return res.json() || {};
    }

    static handleError(error: Response): Observable<any> {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        const body = error.json() || '';
        const err = body.error || {message: 'Server error, try again later'};
        errMsg = err['message'] ? err['message'] : String(err);
        return Observable.throw(errMsg);
    }

    /**
     * Add authorization
     */
    static setAuth(searchParams: URLSearchParams | any | null): URLSearchParams {
        if (localStorage.getItem('access_token') !== null) {
            if (!searchParams) {
                searchParams = new URLSearchParams();
            }
            searchParams.set('access_token', localStorage.getItem('access_token'));
        }
        return searchParams;
    }

    constructor(protected _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    /**
     * Return composed url based on ENV
     * @param endpoint
     * @returns {string}
     */
    protected composeUrl(endpoint: string): string {
        return this.config.baseUrl + endpoint;
    }

    /**
     * Set headers (reset all headers)
     * @param headers
     */
    public setHeaders(headers: any[]): void {
        this.headers = new Headers();
        headers.forEach(header => {
            this.headers.append(
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
            this.headers.append(
                header.name,
                header.value
            );
        });
    }

    /**
     * Creates standard request options
     */
    protected setOptions(requestOptions: RequestOptionsArgs): any {
        return {
            search: ApiService.setAuth(requestOptions && requestOptions.search ? requestOptions.search : null),
            headers: this.headers
        };
    }

    /**
     * POST file request
     * @param endpoint
     * @param file
     * @returns {Observable<R>}
     */
    public postFile(endpoint: string, file: any): Observable<any> {
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers;
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});
        return this._http.post(this.composeUrl(endpoint), formData, options)
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
    }

    /**
     * GET request
     * @param endpoint
     * @param requestOptions
     * @returns {Observable<R>}
     */
    public get(endpoint: string,
               requestOptions?: RequestOptionsArgs): Observable<any> {
        return this._http
            .get(
                this.composeUrl(endpoint),
                this.setOptions(requestOptions)
            )
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
    }

    /**
     * POST request
     * @param endpoint
     * @param body
     * @param requestOptions
     * @returns {Observable<R>}
     */
    public post(endpoint: string,
                body: any,
                requestOptions?: RequestOptionsArgs): Observable<any> {
        return this._http
            .post(
                this.composeUrl(endpoint),
                body,
                this.setOptions(requestOptions)
            )
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
    }

    /**
     * PUT request
     * @param endpoint
     * @param body
     * @param requestOptions
     * @returns {Observable<R>}
     */
    public put(endpoint: string,
               body: any,
               requestOptions?: RequestOptionsArgs): Observable<any> {
        return this._http
            .put(
                this.composeUrl(endpoint),
                body,
                this.setOptions(requestOptions)
            )
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
    }

    /**
     * DELETE request
     * @param endpoint
     * @param requestOptions
     * @returns {Observable<R>}
     */
    public delete(endpoint: string,
                  requestOptions?: RequestOptionsArgs): Observable<any> {
        return this._http
            .delete(
                this.composeUrl(endpoint),
                this.setOptions(requestOptions)
            )
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
    }
}
