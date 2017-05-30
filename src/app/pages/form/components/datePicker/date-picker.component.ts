import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMyDateModel, IMyOptions } from 'mydatepicker';

@Component({
    selector: 'date-picker',
    styleUrls: ['./date-picker.scss'],
    templateUrl: './date-picker.html'
})

export class DatePicker implements OnInit{

    static DEFAULT_DATE_FORMAT: string = 'dd/mm/yyyy';

    @Input() form: FormGroup;
    @Input() field: any = {};

    options: IMyOptions = {
        dateFormat: DatePicker.DEFAULT_DATE_FORMAT
    };
    selectedDate = null;

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
        this.setDate(event.jsdate);
    }

    setDate(value: any): void {
        if (value instanceof Date) {
            this.selectedDate = value;
        } else {
            this.selectedDate = new Date(value);
        }
        this.form.controls[this.field.key].setValue(this.selectedDate);
    }
}
