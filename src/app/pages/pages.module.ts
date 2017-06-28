import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import { TitleChecker, PageRefresh, SetupGuard } from './services';
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
        SetupGuard,
        TitleChecker,
        PageRefresh
    ]
})
export class PagesModule {

}
