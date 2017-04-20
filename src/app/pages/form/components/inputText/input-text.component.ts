import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'input-text',
    templateUrl: './input-text.html'
})
export class InputText {
    @Input() form: FormGroup;
    @Input() field: any = {};
    get isValid() {
        return this.form.controls[this.field.key].valid;
    }
}
