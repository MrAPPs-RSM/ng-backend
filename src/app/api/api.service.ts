import {Injectable} from '@angular/core';

import {Http, Response, Headers, URLSearchParams, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {config} from '../app.config';
import {TokenManager, Logout} from '../auth';

@Injectable()
export class ApiService {

    config: any = config.api[config.env];
    headers: Headers;

    constructor(protected _http: Http,
                protected _tokenManager: TokenManager,
                protected _logout: Logout) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    /**
     * Return composed url based on ENV
     * @param endpoint
     * @returns {string}
     */
    public composeUrl(endpoint: string): string {
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
    protected setOptions(requestOptions: RequestOptionsArgs, withoutHeaders?: boolean): any {
        let options = {
            search: this.setAuth(requestOptions && requestOptions.search ? requestOptions.search : null),
            headers: this.headers
        };
        if (!withoutHeaders) {
            return options;
        } else {
            delete options.headers;
            return options;
        }
    }

    /**
     * GET request
     * @param endpoint
     * @param requestOptions
     * @returns {Observable<R>}
     */
    public get(endpoint: string, requestOptions?: RequestOptionsArgs): Observable<any> {
        return this._http
            .get(
                this.composeUrl(endpoint),
                this.setOptions(requestOptions)
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * POST request
     * @param endpoint
     * @param body
     * @param requestOptions
     * @returns {Observable<R>}
     */
    public post(endpoint: string, body: any, requestOptions?: RequestOptionsArgs): Observable<any> {
        return this._http
            .post(
                this.composeUrl(endpoint),
                body,
                this.setOptions(requestOptions)
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * PUT request
     * @param endpoint
     * @param body
     * @param requestOptions
     * @returns {Observable<R>}
     */
    public put(endpoint: string, body: any, requestOptions?: RequestOptionsArgs): Observable<any> {
        return this._http
            .put(
                this.composeUrl(endpoint),
                body,
                this.setOptions(requestOptions)
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * PATCH request
     * @param endpoint
     * @param body
     * @param requestOptions
     * @returns {Observable<R>}
     */
    public patch(endpoint: string, body: any, requestOptions?: RequestOptionsArgs): Observable<any> {
        return this._http
            .patch(
                this.composeUrl(endpoint),
                body,
                this.setOptions(requestOptions)
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * DELETE request
     * @param endpoint
     * @param requestOptions
     * @returns {Observable<R>}
     */
    public delete(endpoint: string, requestOptions?: RequestOptionsArgs): Observable<any> {
        return this._http
            .delete(
                this.composeUrl(endpoint),
                this.setOptions(requestOptions)
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    /** Response handlers */
    private handleError = (error: Response): Observable<any> | any => {
        if (error.status === 401) { // Unauthorized
            this._logout.logout();
        } else {
            let errMsg: string;
            const body = error.json() || '';
            const err = body.error || {message: 'Server error, try again later'};
            errMsg = err['message'] ? err['message'] : String(err);
            return Observable.throw(errMsg);
        }
    }

    private extractData(res: Response): Object {
        return res.json() || {};
    }

    /**
     * Add authorization
     */
    private setAuth(searchParams: URLSearchParams | any | null): URLSearchParams {
        if (this._tokenManager.getToken() !== null) {
            if (!searchParams) {
                searchParams = new URLSearchParams();
            }
            searchParams.set(this._tokenManager.accessTokenKey, this._tokenManager.getToken());
        }
        return searchParams;
    }
}
