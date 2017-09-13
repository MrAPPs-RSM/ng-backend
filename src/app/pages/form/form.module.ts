import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SelectModule } from 'ng2-select';
import { TinymceModule } from 'angular2-tinymce';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { AgmCoreModule } from '@agm/core';
import { NgUploaderModule } from 'ngx-uploader';
import { CalendarModule } from 'angular-calendar';
import { ColorPickerModule } from 'angular2-color-picker';
import { Ng2SmartTableModule } from '../components/ng2-smart-table';

import { routing } from './form.routing';

import { Form } from './form.component';
import { FormSwitcher } from './switcher';

import { Text, TextArea, Email, Url, Number, Password, CheckBox, Select, DatePicker,
DateRangePicker, LatLng, File, ListDetails, Calendar, ColorPicker, Divider } from './components';

const FORM_COMPONENTS = [
    Text,
    TextArea,
    Email,
    Url,
    ColorPicker,
    Number,
    Password,
    CheckBox,
    Select,
    DatePicker,
    DateRangePicker,
    LatLng,
    File,
    ListDetails,
    Calendar,
    Divider
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
        Ng2SmartTableModule,
        SelectModule,
        NguiDatetimePickerModule,
        TinymceModule.withConfig({}),
        AgmCoreModule.forRoot({
            apiKey: '' // INFO: set google maps apiKey (but works also without it)
        }),
        CalendarModule.forRoot(),
        ColorPickerModule,
        NgUploaderModule,
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
