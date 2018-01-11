import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'input-text',
    templateUrl: './text.html'
})
export class Text implements OnInit {
    @Input() form: FormGroup;
    @Input() field: any = {};

    constructor() {
    }

    ngOnInit() {
    }

    get isValid() {
        return this.form.controls[this.field.key].valid;
    }
}
