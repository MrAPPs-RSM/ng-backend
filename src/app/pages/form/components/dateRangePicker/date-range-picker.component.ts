import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMyOptions } from 'mydaterangepicker';

@Component({
    selector: 'date-range-picker',
    styleUrls: ['./date-range-picker.scss'],
    templateUrl: './date-range-picker.html'
})

export class DateRangePicker implements OnInit{
    @Input() form: FormGroup;
    @Input() field: any = {};

    options: IMyOptions = {
        dateFormat: 'dd/mm/yyyy'
    };

    constructor() {}

    ngOnInit() {
        if (this.field.value) {
            this.setDateRange(this.field.value);
        }
    }

    get isValid() {
        return this.form.controls[this.field.key].valid;
    }

    setDateRange(value: any): void {
        let startDate = new Date(value.startDate);
        let endDate = new Date(value.endDate);
        let jsonValue = {};
        jsonValue[this.field.key] = {
            beginDate: {
                year: startDate.getFullYear(),
                month: startDate.getMonth() + 1,
                day: startDate.getDate()
            },
            endDate: {
                year: endDate.getFullYear(),
                month: endDate.getMonth() + 1,
                day: endDate.getDate()
            }
        };
        this.form.patchValue(jsonValue);
    }

    clearDateRange(): void {
        let jsonValue = {};
        jsonValue[this.field.key] = null;
        this.form.patchValue(jsonValue);
    }
}
