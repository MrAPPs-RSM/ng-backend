import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'input-password',
    templateUrl: './password.html'
})
export class Password {
    @Input() form: FormGroup;
    @Input() field: any = {};

    constructor() {}

    get isValid() {
        return this.form.controls[this.field.key].valid;
    }

    get passwordMatch() {
        if (this.field.hasOwnProperty('confirm')) {
            let password = this.form.controls[this.field.key].value;
            let confirmPassword = this.form.controls[this.field.confirm.key].value;
            if (!isNullOrUndefined(password) && password !== '') {
                return  password === confirmPassword;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    get showPasswordError() {
        if (this.field.hasOwnProperty('confirm')) {
            let password = this.form.controls[this.field.key].value;
            let confirmPassword = this.form.controls[this.field.confirm.key].value;
            return !this.passwordMatch &&
                ((!isNullOrUndefined(password) && password !== '')
                || (!isNullOrUndefined(confirmPassword) && confirmPassword !== ''));
        }
    }
}
