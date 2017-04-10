import { Injectable } from '@angular/core';
import { ApiService }  from '../../api/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class ListService {

    apiKey = '';

    constructor(private _apiService: ApiService) {
    }

    public setApiKey(apiKey: string) {
        this.apiKey = apiKey;
    }

    public getData(): Observable<any> {
        return this._apiService.get(this.apiKey);
    }
}
