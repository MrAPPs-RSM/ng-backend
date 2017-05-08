import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Login } from './login';
import { LoginGuard } from './auth';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
        canActivate: [
            LoginGuard
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
