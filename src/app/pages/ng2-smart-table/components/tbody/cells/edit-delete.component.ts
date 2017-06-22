import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Grid } from '../../../lib/grid';
import { Row } from '../../../lib/data-set/row';

@Component({
    selector: 'ng2-st-tbody-edit-delete',
    template: `        
        <a href="#" *ngIf="grid.getSetting('actions.edit') && grid.getSetting('actions.edit.enable') === true"
           class="ng2-smart-action ng2-smart-action-edit-edit"
           [innerHTML]="grid.getSetting('edit.editButtonContent')" (click)="onEdit($event)"></a>
        
        <a href="#" *ngIf="grid.getSetting('actions.custom') && grid.getSetting('actions.custom.enable') === true"
           class="ng2-smart-action ng2-smart-action-custom-custom"
           [innerHTML]="grid.getSetting('custom.customButtonContent')" (click)="onCustom($event)"></a>
       
        <a href="#" *ngIf="grid.getSetting('actions.delete') && grid.getSetting('actions.delete.enable') === true" 
           class="ng2-smart-action ng2-smart-action-delete-delete"
           [innerHTML]="grid.getSetting('delete.deleteButtonContent')" (click)="onDelete($event)"></a>
        `,
})
export class TbodyEditDeleteComponent {

    @Input() grid: Grid;
    @Input() row: Row;
    @Input() source: any;

    @Output() edit = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();
    @Output() custom = new EventEmitter<any>();
    @Output() editRowSelect = new EventEmitter<any>();

    onEdit(event: any) {
        event.preventDefault();
        event.stopPropagation();

        this.editRowSelect.emit(this.row);

        if (this.grid.getSetting('mode') === 'external') {
            this.edit.emit({
                data: this.row.getData(),
                source: this.source,
            });
        } else {
            this.grid.edit(this.row);
        }
    }

    onDelete(event: any) {
        event.preventDefault();
        event.stopPropagation();

        if (this.grid.getSetting('mode') === 'external') {
            this.delete.emit({
                data: this.row.getData(),
                source: this.source,
            });
        } else {
            this.grid.delete(this.row);
        }
    }

    onCustom(event: any) {
        event.preventDefault();
        event.stopPropagation();

        if (this.grid.getSetting('mode') === 'external') {
            this.custom.emit({
                data: this.row.getData(),
                source: this.source,
            });
        }
    }
}
