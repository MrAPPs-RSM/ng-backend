import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './search.routing';
import { Search } from './search.component';

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        routing
    ],
    declarations: [
        Search
    ],
    providers: []
})
export class SearchModule {
}
