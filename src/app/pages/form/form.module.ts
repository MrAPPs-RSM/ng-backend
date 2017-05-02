import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SelectModule } from 'ng2-select';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { TinymceModule } from 'angular2-tinymce';
import { AgmCoreModule } from '@agm/core';

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
    DateRangePicker,
    LatLng
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
        AgmCoreModule.forRoot({
            apiKey: '' // TODO: set google maps apiKey
        }),
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
        DateRangePicker,
        LatLng
    ],
    providers: [
        FormLoaderService,
        FormHelperService
    ]
})
export class FormModule {
}
