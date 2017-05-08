import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private _router: Router, private _authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._authService.isLogged()) {
            this._router.navigate(['pages']);
            return false;
        } else {
            return true;
        }
    }
}