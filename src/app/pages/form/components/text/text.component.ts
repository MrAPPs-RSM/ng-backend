import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'input-text',
    templateUrl: './text.html'
})
export class Text {
    @Input() form: FormGroup;
    @Input() field: any = {};

    constructor() {}

    get isValid() {
        return this.form.controls[this.field.key].valid;
    }
}
