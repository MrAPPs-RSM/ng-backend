import { Routes, RouterModule }  from '@angular/router';

import { List } from './list.component';
import { ListResolver } from './services';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: List,
        resolve: {
            table: ListResolver
        }
    }
];

export const routing = RouterModule.forChild(routes);
