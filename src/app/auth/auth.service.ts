import { Injectable } from '@angular/core';
import { ApiService } from './../api';
import { Router } from '@angular/router';
import { BaThemeSpinner } from '../theme/services';
import { TokenManager } from './token-manager.service';
import { config } from '../app.config';

@Injectable()
export class AuthService {

    constructor(
        private _tokenManager: TokenManager,
        private _apiService: ApiService,
        private _router: Router,
        private _spinner: BaThemeSpinner) {
    }

    public isLogged(): boolean {
        return this._tokenManager.getToken() !== null;
    }

    public login(body: string): Promise<any> {
        console.log('[AUTH SERVICE]: Action: login');
        return new Promise((resolve, reject) => {
            this._apiService.post(
                config.auth.config.api,
                body
            ).subscribe(
                    response => { // Status 200, OK
                        this._tokenManager.storeToken(response.id);
                        resolve();
                    },
                    error => {  // Other statuses, KO
                        reject(error);
                    }
                );
        });
    }

    public logout() {
        console.log('[AUTH SERVICE]: Action: logout');
        this._tokenManager.removeToken();
        this._spinner.show();
        this._router.navigate(['login']);
        location.reload();
    }
}