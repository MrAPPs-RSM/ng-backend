import { Routes, RouterModule }  from '@angular/router';

import { Form } from './form.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Form
    }
];

export const routing = RouterModule.forChild(routes);
