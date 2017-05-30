import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SelectModule } from 'ng2-select';
import { TinymceModule } from 'angular2-tinymce';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { AgmCoreModule } from '@agm/core';
import { NgUploaderModule } from 'ngx-uploader';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CalendarModule } from 'angular-calendar';

import { routing } from './form.routing';

import { Form } from './form.component';
import { FormSwitcher } from './switcher';

import { Text, TextArea, Email, Url, Number, Password, CheckBox, Select, DatePicker,
DateRangePicker, LatLng, File, ListDetails, Calendar } from './components';

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
    ListDetails,
    Calendar
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
        NguiDatetimePickerModule,
        TinymceModule.withConfig({}),
        AgmCoreModule.forRoot({
            apiKey: '' // TODO: set google maps apiKey (but works also without it)
        }),
        CalendarModule.forRoot(),
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
