import { Routes, RouterModule }  from '@angular/router';

import { List } from './list.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: List
    }
];

export const routing = RouterModule.forChild(routes);
