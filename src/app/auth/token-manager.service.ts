import { Injectable } from '@angular/core';

@Injectable()
export class TokenManager {

    public accessTokenKey = 'access_token';

    constructor() {}

    public storeToken(token: string): void {
        localStorage.setItem(this.accessTokenKey, token);
    }

    public removeToken(): void {
        localStorage.removeItem(this.accessTokenKey);
    }

    public getToken(): string {
        return localStorage.getItem(this.accessTokenKey);
    }
}
