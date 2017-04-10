import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing } from './list.routing';


import { List } from './list.component';
import { ListService } from './list.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        Ng2SmartTableModule,
    ],
    declarations: [
        List
    ],
    providers: [
        ListService
    ]
})
export class ListModule {
}
