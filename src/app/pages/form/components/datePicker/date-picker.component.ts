import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/first';

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
        this.form.controls[this.field.key].valueChanges
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
}
