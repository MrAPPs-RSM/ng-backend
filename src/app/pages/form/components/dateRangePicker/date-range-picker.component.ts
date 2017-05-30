import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'date-range-picker',
    styleUrls: ['./date-range-picker.scss'],
    templateUrl: './date-range-picker.html'
})

export class DateRangePicker implements OnInit {

    @Input() form: FormGroup;
    @Input() field: any = {};

    constructor() {
    }

    ngOnInit() {
    }

    isValidRange() {
        return this.form.controls[this.field.startDate.key].value
            <= this.form.controls[this.field.endDate.key].value;
    }

}
