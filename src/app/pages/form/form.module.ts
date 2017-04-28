import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SelectModule } from 'ng2-select';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { TinymceModule } from 'angular2-tinymce';

import { routing } from './form.routing';

import { Form } from './form.component';

import {
    Text,
    TextArea,
    Email,
    Url,
    Number,
    Password,
    CheckBox,
    Select,
    DatePicker,
    DateRangePicker
} from './components';

import {
    FormLoaderService,
    FormHelperService
} from './services';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgaModule,
        SelectModule,
        MyDatePickerModule,
        MyDateRangePickerModule,
        TinymceModule.withConfig({}),
        routing
    ],
    declarations: [
        Form,
        Text,
        TextArea,
        Email,
        Url,
        Number,
        Password,
        CheckBox,
        Select,
        DatePicker,
        DateRangePicker
    ],
    providers: [
        FormLoaderService,
        FormHelperService
    ]
})
export class FormModule {
}
