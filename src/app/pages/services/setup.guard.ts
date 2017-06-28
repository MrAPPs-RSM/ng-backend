import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SetupService } from '../../setup';

@Injectable()
export class SetupGuard implements CanActivate {

    constructor(private _setupService: SetupService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {
            this._setupService.setup()
                .then(() => {
                    resolve(true);
                });
        });
    }
}
