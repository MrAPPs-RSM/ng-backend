import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'form-switcher',
    templateUrl: './form-switcher.html'
})
export class FormSwitcher {
    @Input() form: FormGroup;
    @Input() fields: any = [];
    @Input() formConfig: any = {};

    constructor() {}
}
