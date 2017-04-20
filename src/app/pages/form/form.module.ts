import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './form.routing';

import { Form } from './form.component';
import { InputText, CheckBox } from './components';
import { FormLoaderService } from './services';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgaModule,
        routing
    ],
    declarations: [
        Form,
        InputText,
        CheckBox
    ],
    providers: [
        FormLoaderService
    ]
})
export class FormModule {
}
