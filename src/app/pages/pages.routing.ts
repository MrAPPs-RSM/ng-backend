import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { PagesResolver } from './services';
import { AuthGuard } from '../auth';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'pages',
        component: Pages,
        resolve: {
            settings: PagesResolver
        },
        canActivate: [
            AuthGuard
        ],
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule'},
            {path: 'list', loadChildren: 'app/pages/list/list.module#ListModule'},
            {path: 'form', loadChildren: 'app/pages/form/form.module#FormModule'},
            {path: 'search/:value', loadChildren: 'app/pages/search/search.module#SearchModule'}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
