import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SelectModule } from 'ng2-select';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { TinymceModule } from 'angular2-tinymce';
import { AgmCoreModule } from '@agm/core';
import { NgUploaderModule } from 'ngx-uploader';
import { NgProgressModule } from 'ng2-progressbar';

import { routing } from './form.routing';

import { Form } from './form.component';
import { FormSwitcher } from './switcher';

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
    LatLng,
    File
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
        NgUploaderModule,
        NgProgressModule,
        routing
    ],
    declarations: [
        FormSwitcher,
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
        LatLng,
        File
    ],
    providers: [
        FormLoaderService,
        FormHelperService
    ]
})
export class FormModule {
}
