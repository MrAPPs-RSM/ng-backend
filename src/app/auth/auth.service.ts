import { Injectable } from '@angular/core';
import { ApiService } from './../api';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    private apiName: string = 'login';
    private localStorageKey = 'user';
    private user: User;

    constructor(private _apiService: ApiService, private _router: Router) {
    }

    public storeUser(user: User): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(user));
    }

    public removeUser(): void {
        localStorage.removeItem(this.localStorageKey);
    }

    public isLogged(): boolean {
        return localStorage.getItem(this.localStorageKey) !== null;
    }

    public getUser(): User {
        let user: string = localStorage.getItem(this.localStorageKey);
        return JSON.parse(user);
    }

    public login(values: string): Promise<any> {
        console.log('[AUTH SERVICE]: Action: login');
        // TODO when real webservices make a post request, passing values as body
        return new Promise((resolve, reject) => {
            this._apiService.get(this.apiName, true)
                .subscribe(
                    response => {
                        if (response.success) {
                            this.storeUser(response.data);
                            resolve();
                        } else {
                            reject(response.message);
                        }
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    }

    public logout() {
        console.log('[AUTH SERVICE]: Action: logout');
        this.removeUser();
        this._router.navigate(['login']);
    }
}

interface User {
    token: string;
    username: string;
}
