import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Pages } from '../pages.component';
import { SetupService } from '../../setup';

@Injectable()
export class PagesResolver implements Resolve<Pages> {

    constructor(protected _setupService: SetupService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            this._setupService.setup()
                .then((settings) => {
                    resolve(settings);
                });
        });
    }
}
