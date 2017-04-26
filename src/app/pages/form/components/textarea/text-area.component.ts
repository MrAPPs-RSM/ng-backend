import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'input-text-area',
    templateUrl: './text-area.html'
})
export class TextArea {
    @Input() form: FormGroup;
    @Input() field: any = {};

    constructor() {}

    get isValid() {
        return this.form.controls[this.field.key].valid;
    }
}
