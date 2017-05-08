import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import { PagesResolver } from './services';
import { AuthGuard } from '../auth';

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        routing
    ],
    declarations: [
        Pages
    ],
    providers: [
        AuthGuard,
        PagesResolver
    ]
})
export class PagesModule {

}
