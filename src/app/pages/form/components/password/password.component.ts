import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
}
