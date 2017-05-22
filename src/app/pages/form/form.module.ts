import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SelectModule } from 'ng2-select';
import { MyDatePickerModule } from 'mydatepicker';
import { TinymceModule } from 'angular2-tinymce';
import { AgmCoreModule } from '@agm/core';
import { NgUploaderModule } from 'ngx-uploader';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing } from './form.routing';

import { Form } from './form.component';
import { FormSwitcher } from './switcher';

import { Text, TextArea, Email, Url, Number, Password, CheckBox, Select, DatePicker,
DateRangePicker, LatLng, File, ListDetails } from './components';

const FORM_COMPONENTS = [
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
    File,
    ListDetails
];

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
        TinymceModule.withConfig({}),
        AgmCoreModule.forRoot({
            apiKey: '' // TODO: set google maps apiKey (but works also without it)
        }),
        NgUploaderModule,
        Ng2SmartTableModule,
        routing
    ],
    declarations: [
        FormSwitcher,
        Form,
        FORM_COMPONENTS
    ],
    providers: [
        FormLoaderService,
        FormHelperService
    ]
})
export class FormModule {
}
