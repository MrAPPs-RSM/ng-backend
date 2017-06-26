import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenManager } from './token-manager.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _tokenManager: TokenManager) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._tokenManager.getToken() !== null) {
            return true;
        } else {
            this._router.navigate(['login']);
            return false;
        }
    }
}