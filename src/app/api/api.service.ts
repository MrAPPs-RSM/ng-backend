import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    baseUrl = 'api/backend/';

    constructor(private _http: Http) {
    }

    protected composeUrl(url) {
        return this.baseUrl + url;
    }

    public get(url) {
        return this._http
            .get(this.composeUrl(url))
            .map(this.extractData)
            .catch(this.handleError);
    };

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