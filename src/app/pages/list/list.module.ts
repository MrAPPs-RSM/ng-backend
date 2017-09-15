import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from './../components/ng2-smart-table';
import { routing } from './list.routing';

import { List } from './list.component';
import { ListResolver, ListPaging } from './services';
import { BooleanRender, DateRender, ImageRender, ColorRender, LinkRender } from './views';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        Ng2SmartTableModule,
        routing
    ],
    entryComponents: [BooleanRender, DateRender, ImageRender, ColorRender, LinkRender],
    declarations: [
        List,
        BooleanRender,
        ImageRender,
        DateRender,
        ColorRender,
        LinkRender
    ],
    providers: [
        ListResolver,
        ListPaging
    ]
})
export class ListModule {
}
