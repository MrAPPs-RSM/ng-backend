import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectComponent } from 'ng2-select';
import { ApiService } from '../../../../api';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'list-details',
    styleUrls: ['./list-details.scss'],
    templateUrl: './list-details.html',
})
export class ListDetails implements OnInit {
    @Input() form: FormGroup;
    @Input() field: any = {};
    @ViewChild('ngSelect') public ngSelect: SelectComponent;

    items: any[] = [];

    showSelect: boolean = false;
    tableSettings: any = {
        mode: 'external',
        noDataMessage: 'No data found',
        delete: {
            deleteButtonContent: '<span class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></span>'
        },
        actions: {
            position: 'right',
            delete: true,
            edit: false,
            add: false,
            columnTitle: 'Actions'
        },
        columns: {}
    };
    tableKeys: any[] = [];
    dataSource: LocalDataSource = new LocalDataSource();
    selectedItem: any = {};

    constructor(
        protected _apiService: ApiService) {
    }

    get confirmDisabled(){
        return Object.keys(this.selectedItem).length === 0;
    }

    ngOnInit() {
        this.loadTable();
        this.tableSettings.columns = this.field.options.columns;
        if (this.field.options.data instanceof Array) {
            this.items = this.field.options.data;
        } else {
            this._apiService.get(this.field.options.data, false)
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

    loadTable(): void {
        Object.keys(this.field.options.columns).forEach((key) => {
            this.tableKeys.push(key);
            this.field.options.columns[key].filter = false;
            this.field.options.columns[key].sort = false;
        });
        this.dataSource.load([]);
    }

    setSelectedItem(value: any): void {
        this.selectedItem[this.tableKeys[0]] = value.id;
        this.selectedItem[this.tableKeys[1]] = value.text;
    }

    dismiss(): void {
        this.showSelect = false;
        this.selectedItem = {};
    }

    addValue(): void {
        this.dataSource.append(this.selectedItem);
        this.dismiss();
    }

    deleteValue(event: any): void {
        this.dataSource.remove(event.data);
    }
}

