import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMyDateModel, IMyOptions } from 'mydatepicker';
import * as _ from 'lodash';

@Component({
    selector: 'date-picker',
    styleUrls: ['./date-picker.scss'],
    templateUrl: './date-picker.html'
})

export class DatePicker implements OnInit{

    static EMPTY_DATE_STRING: string = '';
    static EMPTY_DATE_OBJ: any = {year: 0, month: 0, day: 0};
    static DEFAULT_DATE_FORMAT: string = 'dd/mm/yyyy';

    @Input() form: FormGroup;
    @Input() field: any = {};

    options: IMyOptions = {
        dateFormat: DatePicker.DEFAULT_DATE_FORMAT
    };
    selectedDate: any = DatePicker.EMPTY_DATE_STRING;

    constructor() {}

    ngOnInit() {
        this.setCustomOptions();
        if (this.field.value) {
            this.setDate(this.field.value);
        }
    }

    setCustomOptions(): void {
        if (this.field.options.dateFormat) {
            this.options.dateFormat = this.field.options.dateFormat;
        }
    }

    onDateChanged(event: IMyDateModel): void {
        this.setDate(event.date);
    }

    setDate(value: any): void {
        let dateObj: any = {};
        if (value.hasOwnProperty('year') && value.hasOwnProperty('month') && value.hasOwnProperty('day')) {
            dateObj.year = value.year;
            dateObj.month = value.month;
            dateObj.day = value.day;
        } else {
            let date = new Date(value);
            dateObj.year = date.getFullYear();
            dateObj.month = date.getMonth() + 1;
            dateObj.day = date.getDate();
        }

        if (_.isEqual(dateObj, DatePicker.EMPTY_DATE_OBJ)) {
            dateObj = DatePicker.EMPTY_DATE_STRING;
        }

        this.selectedDate = dateObj;

        let jsonValue = {};
        jsonValue[this.field.key] = dateObj;
        this.form.patchValue(jsonValue);
    }
}
