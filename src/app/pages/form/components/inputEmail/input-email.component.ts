import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'input-email',
    templateUrl: './input-email.html'
})
export class InputEmail {
    @Input() form: FormGroup;
    @Input() field: any = {};
    get isValid() {
        return this.form.controls[this.field.key].valid;
    }
}
