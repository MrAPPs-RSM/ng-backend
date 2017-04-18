import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing } from './list.routing';

import { List } from './list.component';
import { ListResolver } from './services';
import { BooleanRender } from './views';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        Ng2SmartTableModule
    ],
    entryComponents: [BooleanRender],
    declarations: [
        List,
        BooleanRender
    ],
    providers: [
        ListResolver
    ]
})
export class ListModule {
}
