import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectComponent } from 'ng2-select';
import { ApiService } from '../../../../api';
import { ToastHandler } from '../../../../theme/services';

@Component({
    selector: 'ui-select',
    styleUrls: ['./select.scss'],
    templateUrl: './select.html'
})
export class Select implements OnInit {
    @Input() form: FormGroup;
    @Input() field: any = {};
    @Input() isEdit: boolean;
    @ViewChild('ngSelect') public ngSelect: SelectComponent;

    selectValues: any[] = [];
    value: any = null;

    constructor(protected _apiService: ApiService,
                protected _toastHandler: ToastHandler) {
    }

    get isValid() {
        if (this.field.validators && this.field.validators.required) {
            return this.value !== null;
        } else {
            return true;
        }
    }

    ngOnInit() {
        this.loadData();
    }

    /**
     * Load select options
     * @returns {Promise<T>}
     */
    loadSelectValues(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.field.values instanceof Array) {
                this.selectValues = this.field.values;
                resolve();
            } else {
                this._apiService.get(this.field.values)
                    .subscribe(
                        data => {
                            this.selectValues = data;
                            resolve();
                        },
                        error => {
                            reject(error);
                        }
                    );
            }
        });
    }

    /**
     * Load pre-selected data (if present)
     */
    loadData(): void {
        if (this.isEdit) {
            this.form.controls[this.field.key].valueChanges
                .first()
                .subscribe(
                    value => {
                        this.loadSelectValues()
                            .then(() => {
                                this.selectValues.forEach((item, index) => {
                                    if (item.id == value) {
                                        this.ngSelect.active = [this.selectValues[index]];
                                        this.refreshValue(this.selectValues[index]);
                                    }
                                });
                            })
                            .catch((error) => {
                                this._toastHandler.error(error);
                            });
                    }
                );
        } else {
            this.loadSelectValues()
                .then(() => {
                })
                .catch((error) => {
                    this._toastHandler.error(error);
                });
        }
    }

    showClearButton(): boolean {
        return this.value !== null;
    }

    clearValue(): void {
        this.ngSelect.active = [];
        this.refreshValue(null);
    }

    refreshValue(value: any): void {
        this.value = value ? value.id : null;
        this.refreshFormValue();
    }

    refreshFormValue(): void {
        this.form.controls[this.field.key].setValue(this.value);
    }
}
