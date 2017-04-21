import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SelectModule } from 'ng2-select';
import { routing } from './form.routing';

import { Form } from './form.component';
import { InputText, InputEmail, CheckBox, InputSelect } from './components';
import { FormLoaderService } from './services';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgaModule,
        SelectModule,
        routing
    ],
    declarations: [
        Form,
        InputText,
        InputEmail,
        CheckBox,
        InputSelect
    ],
    providers: [
        FormLoaderService
    ]
})
export class FormModule {
}
