import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'color-picker',
    templateUrl: './color-picker.html'
})

export class ColorPicker implements OnInit {

    @Input() form: FormGroup;
    @Input() field: any = {};
    @Input() isEdit: boolean;

    color: any = null;

    constructor() {
    }

    get isValid() {
        return this.form.controls[this.field.key].valid;
    }

    ngOnInit() {
        if (this.isEdit) {
            this.form.controls[this.field.key].valueChanges
                .first()
                .subscribe(
                    value => {
                        this.onColorChange(value);
                    }
                );
        } else {
            this.onColorChange(null);
        }
    }

    onColorChange(color: any): void {
        if (color === null) {
            color = '#ffffff';
        }
        this.color = color;
        this.form.controls[this.field.key].setValue(color);
    }
}
