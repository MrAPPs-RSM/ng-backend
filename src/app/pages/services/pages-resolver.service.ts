import { Injectable } from '@angular/core';
import { Pages } from '../pages.component';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable }  from 'rxjs';
import { SetupService } from '../../setup';
import { BaMenuService } from '../../theme/services';
import * as _ from 'lodash';

@Injectable()
export class PagesResolver implements Resolve<Pages> {

    constructor(
        protected _router: Router,
        protected _setupService: SetupService,
        protected _baMenuService: BaMenuService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.load();
    }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._setupService.setup()
                .subscribe(
                    data => {
                        // Creating sidebar and pages
                        let convertedRoutes = this._baMenuService.convertRoutesToMenus(_.cloneDeep(data.sections));
                        this._baMenuService.menuItems.next(convertedRoutes);
                        // Creating routes
                        this._setupService.loadRoutes(data);
                        resolve(data.settings);
                    },
                    error => {
                        // This error might never happen, but in case redirect to login
                        this._router.navigate(['login']);
                    }
                );
        });
    }
}
