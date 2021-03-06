import { Component, Input, Output, SimpleChange, EventEmitter, OnChanges, OnInit } from '@angular/core';

import { Grid } from './lib/grid';
import { DataSource } from './lib/data-source/data-source';
import { Row } from './lib/data-set/row';
import { deepExtend } from './lib/helpers';
import { LocalDataSource } from './lib/data-source/local/local.data-source';
import { DragulaService } from 'ng2-dragula';

@Component({
    selector: 'ng2-smart-table',
    styleUrls: ['./ng2-smart-table.component.scss'],
    templateUrl: './ng2-smart-table.component.html',
})
export class Ng2SmartTableComponent implements OnChanges, OnInit {
    @Input() enableDrag: boolean;
    @Input() dragulaRowsOptions: any;
    @Output() dragulaRowDrop: EventEmitter<any> = new EventEmitter();

    @Input() paginationPosition: string;

    @Input() source: any;
    @Input() settings: Object = {};

    @Output() rowSelect = new EventEmitter<any>();
    @Output() userRowSelect = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();
    @Output() edit = new EventEmitter<any>();
    @Output() custom = new EventEmitter<any>();
    @Output() create = new EventEmitter<any>();
    @Output() rowHover: EventEmitter<any> = new EventEmitter<any>();

    grid: Grid;
    defaultSettings: Object = {

        mode: 'inline', // inline|external|click-to-edit
        selectMode: 'single', // single|multi
        hideHeader: false,
        hideSubHeader: false,
        actions: {
            columnTitle: 'Actions',
            add: true,
            edit: true,
            delete: true,
            position: 'left', // left|right
        },
        filter: {
            inputClass: '',
        },
        edit: {
            inputClass: '',
            editButtonContent: 'Edit',
            saveButtonContent: 'Update',
            cancelButtonContent: 'Cancel',
            confirmSave: false,
        },
        add: {
            inputClass: '',
            addButtonContent: 'Add New',
            createButtonContent: 'Create',
            cancelButtonContent: 'Cancel',
            confirmCreate: false,
        },
        delete: {
            deleteButtonContent: 'Delete',
            confirmDelete: false,
        },
        attr: {
            id: '',
            class: '',
        },
        noDataMessage: 'No data found',
        columns: {},
        pager: {
            display: true,
            page: 1,
            perPage: 10
        },
    };

    isAllSelected: boolean = false;
    private oldRowIndex: number | null = null;

    constructor(private dragulaService: DragulaService) {
    }

    ngOnInit(): void {
        if (this.enableDrag) {
            this.dragulaService.drag.subscribe((args: any) => this.onDragRow(args));
            this.dragulaService.dropModel.subscribe((args: any) => this.onDropRow(args));
        }
        else {
            this.dragulaService = null;
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (this.grid) {
            if (changes['settings']) {
                this.grid.setSettings(this.prepareSettings());
            }
            if (changes['source']) {
                this.source = this.prepareSource();
                this.grid.setSource(this.source);
            }
        } else {
            this.initGrid();
        }
    }

    editRowSelect(row: Row) {
        if (this.grid.getSetting('selectMode') === 'multi') {
            this.onMultipleSelectRow(row);
        } else {
            this.onSelectRow(row);
        }
    }

    onUserSelectRow(row: Row) {
        if (this.grid.getSetting('selectMode') !== 'multi') {
            this.grid.selectRow(row);
            this.emitUserSelectRow(row);
            this.emitSelectRow(row);
        }
    }

    onRowHover(row: Row) {
        this.rowHover.emit(row);
    }

    multipleSelectRow(row: Row) {
        this.grid.multipleSelectRow(row);
        this.emitUserSelectRow(row);
        this.emitSelectRow(row);
    }

    onSelectAllRows($event: any) {
        this.isAllSelected = !this.isAllSelected;
        this.grid.selectAllRows(this.isAllSelected);

        this.emitUserSelectRow(null);
        this.emitSelectRow(null);
    }

    onSelectRow(row: Row) {
        this.grid.selectRow(row);
        this.emitSelectRow(row);
    }

    onMultipleSelectRow(row: Row) {
        this.emitSelectRow(row);
    }

    initGrid() {
        this.source = this.prepareSource();
        this.grid = new Grid(this.source, this.prepareSettings());
        this.grid.onSelectRow().subscribe((row) => this.emitSelectRow(row));
    }

    prepareSource(): DataSource {
        if (this.source instanceof DataSource) {
            return this.source;
        } else if (this.source instanceof Array) {
            return new LocalDataSource(this.source);
        }

        return new LocalDataSource();
    }

    prepareSettings(): Object {
        return deepExtend({}, this.defaultSettings, this.settings);
    }

    changePage($event: any) {
        this.resetAllSelector();
    }

    changePerPage($event: any) {
        this.resetAllSelector();
    }

    sort($event: any) {
        this.resetAllSelector();
    }

    filter($event: any) {
        this.resetAllSelector();
    }

    private resetAllSelector() {
        this.isAllSelected = false;
    }

    private emitUserSelectRow(row: Row) {
        const selectedRows = this.grid.getSelectedRows();
        this.userRowSelect.emit({
            data: row ? row.getData() : null,
            isSelected: row ? row.getIsSelected() : null,
            source: this.source,
            selected: selectedRows && selectedRows.length ? selectedRows.map((r: Row) => r.getData()) : [],
        });
    }

    private emitSelectRow(row: Row) {
        this.rowSelect.emit({
            data: row ? row.getData() : null,
            isSelected: row ? row.getIsSelected() : null,
            source: this.source,
        });
    }

    /** ---------------- DRAG & DROP ------------------ */
    private onDragRow(args: any): void {
        const [bagName, el, source] = args;
        this.oldRowIndex = this.getDomIndexOf(el, source);
    }

    private onDropRow(args: any): void {
        const [bagName, el, target, source] = args;
        const newRowIndex = this.getDomIndexOf(el, target);
        const bag = this.dragulaService.find(bagName);
        const drake = bag.drake;
        let model = drake.models[0];

        this.dragulaRowDrop.emit({
            oldRowIndex: this.oldRowIndex,
            newRowIndex: newRowIndex,
            model: model
        });
    }

    private getDomIndexOf(child: any, parent: any) {
        return Array.prototype.indexOf.call(parent.children, child);
    }
}
