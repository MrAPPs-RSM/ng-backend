import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'input-email',
    templateUrl: './email.html'
})
export class Email {
    @Input() form: FormGroup;
    @Input() field: any = {};

    constructor() {}

    get isValid() {
        return this.form.controls[this.field.key].valid;
    }
}
