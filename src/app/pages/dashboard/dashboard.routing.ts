import { Routes, RouterModule }  from '@angular/router';

import { Dashboard } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { DashboardResolver } from './services';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
        resolve: {
            params: DashboardResolver
        },
        children: []
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
