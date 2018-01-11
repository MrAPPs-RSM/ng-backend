import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SelectComponent} from 'ng2-select';
import {ApiService} from '../../../../api';
import {ToastHandler} from '../../../../theme/services';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'ui-select',
    styleUrls: ['./select.scss'],
    templateUrl: './select.html',
    encapsulation: ViewEncapsulation.None
})
export class Select implements OnInit {
    @Input() form: FormGroup;
    @Input() field: any = {};
    @Input() isEdit: boolean;
    @ViewChild('ngSelect') public ngSelect: SelectComponent;

    selectValues: any[] = [];
    value: any = null;

    constructor(protected _route: ActivatedRoute,
                protected _apiService: ApiService,
                protected _toastHandler: ToastHandler) {
    }

    get isValid() {
        if (this.field.validators && this.field.validators.required) {
            if (this.field.multiple) {
                if (this.value instanceof Array) {
                    return this.value.length > 0;
                } else {
                    return this.value !== null;
                }
            } else {
                return this.value !== null;
            }
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

                let endpoint = this.field.values;
                if (endpoint.indexOf(':id') !== -1) {
                    endpoint = endpoint.replace(':id', this._route.params['value'].id);
                }

                this._apiService.get(endpoint)
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
                        this.loadSelectValues().then(() => {
                            this.selectValues.forEach((item, index) => {
                                if (!this.field.multiple) {
                                    if (item.id == value) {
                                        this.ngSelect.active = [this.selectValues[index]];
                                        this.refreshValue(this.selectValues[index]);
                                    }
                                } else {
                                    if (value instanceof Array) {
                                        value.forEach((valueItem) => {
                                            if (valueItem.id == item.id) {
                                                this.ngSelect.active.push(this.selectValues[index]);
                                                this.refreshValue(value);
                                            }
                                        });
                                    }
                                }
                            });
                        }).catch((error) => {
                            this._toastHandler.error(error);
                        });
                    }
                );
        } else {
            this.loadSelectValues().catch((error) => {
                this._toastHandler.error(error);
            });
        }
    }

    showClearButton(): boolean {
        return this.value !== null;
    }

    showSelectAllButton(): boolean {
        if (this.field.multiple) {
            if (this.value != null) {
                return this.value.length === 0;
            }
            return true;
        }
        return false;
    }

    clearValue(): void {
        this.ngSelect.active = [];
        this.refreshValue(null);
    }

    selectAllValues(): void {
        this.selectValues.forEach((item, index) => {
            this.ngSelect.active.push(this.selectValues[index]);
        });
        this.refreshValue(this.selectValues);
    }

    refreshValue(value: any): void {
        if (this.field.multiple) {
            let values = null;
            if (value != null) {
                values = [];
                value.forEach((item) => {
                    values.push(item.id);
                });
            }
            this.value = values;
        } else {
            this.value = value ? value.id : null;
        }

        this.refreshFormValue();
    }

    refreshFormValue(): void {
        this.form.controls[this.field.key].setValue(this.value);
    }
}
