import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'input-number',
    templateUrl: './number.html'
})
export class Number implements OnInit{
    @Input() form: FormGroup;
    @Input() field: any = {};

    public calculatedValue: any;

    constructor(protected _route: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.field.value) {
            if (this.field.value === ':id') {
                this.calculatedValue = this._route.params['value'].id;
                this.form.controls[this.field.key].setValue(this.calculatedValue);
            } else {
                if (!isNaN(this.field.value)) {
                    this.calculatedValue = this.field.value;
                }
            }
        } else {
            this.calculatedValue = null;
        }
    }

    get isValid() {
        return this.form.controls[this.field.key].valid;
    }
}
