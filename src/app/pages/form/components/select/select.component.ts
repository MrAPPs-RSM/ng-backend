import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectComponent } from 'ng2-select';
import { ApiService } from '../../../../api';

@Component({
    selector: 'ui-select',
    styleUrls: ['./select.scss'],
    templateUrl: './select.html'
})
export class Select implements OnInit {
    @Input() form: FormGroup;
    @Input() field: any = {};
    @ViewChild('ngSelect') public ngSelect: SelectComponent;

    items: any[] = [];
    value: any = {};

    constructor(protected _apiService: ApiService) {
    }

    ngOnInit() {
        if (this.field.options instanceof Array) {
            this.items = this.field.options;
        } else {
            this._apiService.get(this.field.options, false)
                .subscribe(
                    data => {
                        this.items = data;
                    },
                    error => {
                        console.log(error);
                        // TODO
                    }
                );
        }
    }

    get isValid() {
        if (this.field.validators.required) {
            if (this.field.multiple) {
                return this.value.length > 0;
            } else {
                return this.value.hasOwnProperty('id') && this.value.hasOwnProperty('text');
            }
        } else {
            return true;
        }
    }

    public showClearButton() {
        return this.field.multiple ? false : this.value.hasOwnProperty('id') && this.value.hasOwnProperty('text');
    }

    public clearValue(): void {
        this.ngSelect.active = [];
        this.form.controls[this.field.key].reset();
        this.refreshValue({});
    }

    public refreshValue(value: any): void {
        this.value = value;
    }
}
