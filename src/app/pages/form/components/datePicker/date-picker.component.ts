import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NguiDatetime } from '@ngui/datetime-picker';

@Component({
    selector: 'date-picker',
    styleUrls: ['./date-picker.scss'],
    templateUrl: './date-picker.html'
})

export class DatePicker implements OnInit {

    @Input() form: FormGroup;
    @Input() field: any = {};
    date: any;

    constructor() {
    }

    get isValid() {
        return this.form.controls[this.field.key].valid;
    }

    ngOnInit() {
        // TODO fix when pre-selected value in edit forms
    }
}
