import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMyOptions } from 'mydatepicker';

@Component({
    selector: 'date-picker',
    styleUrls: ['./date-picker.scss'],
    templateUrl: './date-picker.html'
})

export class DatePicker implements OnInit{
    @Input() form: FormGroup;
    @Input() field: any = {};

    options: IMyOptions = {
        dateFormat: 'dd/mm/yyyy'
    };

    constructor() {}

    ngOnInit() {
        if (this.field.value) {
            this.setDate(this.field.value);
        }
    }

    get isValid() {
        return this.form.controls[this.field.key].valid;
    }

    setDate(value: any): void {
        let date = new Date(value);
        let jsonValue = {};
        jsonValue[this.field.key] = {
            date: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            }
        };
        this.form.patchValue(jsonValue);
    }

    clearDate(): void {
        let jsonValue = {};
        jsonValue[this.field.key] = null;
        this.form.patchValue(jsonValue);
    }
}
