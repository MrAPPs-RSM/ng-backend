import { Routes, RouterModule }  from '@angular/router';
import { Search } from './search.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Search
    }
];

export const routing = RouterModule.forChild(routes);
