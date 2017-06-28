import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PageRefresh {

    lastPathKey = 'last_path';

    constructor(protected _router: Router) {
    }

    public setLastPath(path: string): void {
        localStorage.setItem(this.lastPathKey, path);
    }

    public getLastPath(): string {
        return localStorage.getItem(this.lastPathKey);
    }

    public renavigate(): void {
        this._router.navigate([localStorage.getItem(this.lastPathKey)]);
    }

    public reset(): void {
        localStorage.removeItem(this.lastPathKey);
    }
}
