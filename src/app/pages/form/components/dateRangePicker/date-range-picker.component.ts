import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMyDateModel, IMyOptions } from 'mydatepicker';
import * as _ from 'lodash';

@Component({
    selector: 'date-range-picker',
    styleUrls: ['./date-range-picker.scss'],
    templateUrl: './date-range-picker.html'
})

export class DateRangePicker implements OnInit {

    static EMPTY_DATE_STRING: string = '';
    static EMPTY_DATE_OBJ: any = {year: 0, month: 0, day: 0};
    static DEFAULT_DATE_FORMAT: string = 'dd/mm/yyyy';

    @Input() form: FormGroup;
    @Input() field: any = {};

    options: IMyOptions = {
        dateFormat: DateRangePicker.DEFAULT_DATE_FORMAT,
        disableUntil: {year: 0, month: 0, day: 0}
    };
    startDate: any = DateRangePicker.EMPTY_DATE_STRING;
    endDate: any = DateRangePicker.EMPTY_DATE_STRING;

    constructor() {
    }

    ngOnInit() {
        this.setCustomOptions();
        if (this.field.startDate.value) {
            this.setDate(this.field.startDate.value, this.field.startDate.key);
        }
        if (this.field.endDate.value) {
            this.setDate(this.field.endDate.value, this.field.endDate.key);
        }
    }

    isValidRange(): boolean {
        return new Date(this.startDate.year, (this.startDate.month - 1), this.startDate.day)
            <= new Date(this.endDate.year, (this.endDate.month - 1), this.endDate.day);
    }

    setCustomOptions(): void {
        if (this.field.options.dateFormat) {
            this.options.dateFormat = this.field.options.dateFormat;
        }
    }

    onDateChanged(event: IMyDateModel, picker: string): void {
        switch (picker) {
            case 'start': {
                this.setDate(event.date, this.field.startDate.key);
            }
                break;
            case 'end': {
                this.setDate(event.date, this.field.endDate.key);
            }
                break;
            default: {
            }
                break;
        }
    }

    setDate(value: any, key: string): void {
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

        if (_.isEqual(dateObj, DateRangePicker.EMPTY_DATE_OBJ)) {
            dateObj = DateRangePicker.EMPTY_DATE_STRING;
        }

        switch (key) {
            case this.field.startDate.key: {
                this.startDate = dateObj;
            }
                break;
            case this.field.endDate.key: {
                this.endDate = dateObj;
            }
                break;
            default: {
            }
                break;
        }

        let jsonValue = {};
        jsonValue[key] = dateObj;
        this.form.patchValue(jsonValue);
    }
}
