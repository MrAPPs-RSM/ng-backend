import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectComponent } from 'ng2-select';
import { ApiService } from '../../../../api';
import { LocalDataSource } from 'ng2-smart-table';
import { Utils } from '../../../../utils';
import { ToastHandler } from '../../../../theme/services';

@Component({
    selector: 'list-details',
    styleUrls: ['./list-details.scss'],
    templateUrl: './list-details.html',
})
export class ListDetails implements OnInit {
    @Input() form: FormGroup;
    @Input() field: any = {};
    @ViewChild('ngSelect') public ngSelect: SelectComponent;

    formValue: any[] = [];
    selectValues: any[] = [];

    showSelect: boolean = false;
    tableSettings: any = {
        mode: 'external',
        noDataMessage: '',
        delete: {
            deleteButtonContent: '<span class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></span>'
        },
        actions: {
            position: 'right',
            delete: true,
            edit: false,
            add: false,
            columnTitle: ''
        },
        columns: {}
    };
    tableKeys: any[] = [];
    dataSource: LocalDataSource = new LocalDataSource();
    selectedItem: any = {};

    constructor(protected _apiService: ApiService,
                protected _toastHandler: ToastHandler) {
    }

    get confirmDisabled(){
        return Utils.isEmptyObject(this.selectedItem);
    }

    ngOnInit() {
        this.loadTable();
        this.loadSelectValues();
    }

    /**
     * Load table: set table columns, options and load default data
     */
    loadTable(): void {
        this.tableSettings.noDataMessage = this.field.options.noDataMessage ?
            this.field.options.noDataMessage : 'No data selected';
        this.tableSettings.actions.columnTitle = this.field.options.actionsTitle ?
            this.field.options.actionsTitle : 'Actions';
        this.tableSettings.columns = this.field.options.columns;
        Object.keys(this.field.options.columns).forEach((key) => {
            this.tableKeys.push(key);
            this.field.options.columns[key].filter = false;
            this.field.options.columns[key].sort = false;
        });
        this.dataSource.load([]);
    }

    loadSelectValues(): void {
        if (this.field.options.data instanceof Array) {
            this.transformSelectValues(this.field.options.data);
        } else {
            this._apiService.get(this.field.options.data)
                .subscribe(
                    data => {
                        this.transformSelectValues(data);
                    },
                    error => {
                        this._toastHandler.error(error);
                    }
                );
        }
    }

    transformSelectValues(data: any[]): void {
        data.forEach((item) => {
            this.selectValues.push({
                id: item[this.tableKeys[0]],
                text: item[this.tableKeys[1]]
            });
        });
        console.log(this.selectValues);
    }

    /**
     * Set the active item by the select option
     * @param value
     */
    setSelectedItem(value: any): void {
        this.selectedItem[this.tableKeys[0]] = value.id;
        this.selectedItem[this.tableKeys[1]] = value.text;
    }

    /**
     * Remove the last-added-to-list value from the select to avoid duplicates
     */
    removeValueFromSelect(): void {
        let itemIndex: number = -1;
        this.selectValues.forEach((item, index) => {
            if (item.id === this.selectedItem[this.tableKeys[0]]
                && item.text === this.selectedItem[this.tableKeys[1]]) {
                itemIndex = index;
            }
        });
        if (itemIndex !== -1) {
            this.selectValues.splice(itemIndex, 1);
        }
    }

    /**
     * Re-add the deleted-from-list value to the select
     * @param item
     */
    reAddValueToSelect(item: any): void {
        this.selectValues.push({
            id: item[this.tableKeys[0]],
            text: item[this.tableKeys[1]]
        });
        this.showSelect = false;
    }

    /**
     * Dismiss option after select options
     */
    dismiss(): void {
        this.showSelect = false;
        this.selectedItem = {};
    }

    /**
     * Confirm option after select options (add the selected item to the list)
     */
    addItem(): void {
        this.dataSource.append(this.selectedItem);
        this.removeValueFromSelect();
        this.updateFormValue(this.selectedItem, true);
        this.dismiss();
    }

    /**
     * Deletes the selected item from the list
     */
    deleteItem(event: any): void {
        this.dataSource.remove(event.data);
        this.reAddValueToSelect(event.data);
        this.updateFormValue(event.data, false);
    }

    /**
     * Updates form control value
     */
    updateFormValue(item: any, add: boolean): void {
        if (add) {
            this.formValue.push(item);
        } else {
            this.formValue = Utils.removeObjectFromArray(item, this.formValue);
        }
        this.form.controls[this.field.key].setValue(this.formValue);
    }
}
