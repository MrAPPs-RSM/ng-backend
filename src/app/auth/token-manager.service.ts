import { Injectable } from '@angular/core';

@Injectable()
export class TokenManager {

    public accessTokenKey = 'access_token';
    private setupKey = 'setup';

    constructor() {}

    public storeToken(token: string): void {
        localStorage.setItem(this.accessTokenKey, token);
    }

    public removeToken(): void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.setupKey);
    }

    public getToken(): string {
        return localStorage.getItem(this.accessTokenKey);
    }
}
