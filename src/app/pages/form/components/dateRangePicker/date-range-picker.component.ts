import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import 'rxjs/add/operator/first';

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
        this.form.controls[this.field.startDate.key].valueChanges
            .subscribe(value => {
                if (value && !isNaN(value)) {
                    let date = new Date(value);

                    let formatDate = date.getUTCFullYear() + '-' +
                        date.getUTCMonth() + '-' +
                        date.getUTCDate() + ' ' +
                        date.getUTCHours() + ':' + date.getUTCMinutes();

                    this.form.controls[this.field.key].setValue(formatDate);
                }
            });
        this.form.controls[this.field.endDate.key].valueChanges
            .first()
            .subscribe(value => {
                if (value && !isNaN(value)) {
                    let date = new Date(value);

                    let formatDate = date.getUTCFullYear() + '-' +
                        date.getUTCMonth() + '-' +
                        date.getUTCDate() + ' ' +
                        date.getUTCHours() + ':' + date.getUTCMinutes();

                    this.form.controls[this.field.key].setValue(formatDate);
                }
            });
    }

    isValidRange() {
        return this.form.controls[this.field.startDate.key].value
            <= this.form.controls[this.field.endDate.key].value;
    }

}
