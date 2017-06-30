import { Component, Input } from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';

@Component({
    selector: 'table-cell-view-mode',
    template: `
        <div [ngSwitch]="cell.getColumn().type">
            <custom-view-component *ngSwitchCase="'custom'" [cell]="cell"></custom-view-component>
            <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue()"></div>
            <div *ngSwitchCase="'string'" [innerHTML]="getStringValue()"></div>
            <div *ngSwitchDefault>{{ cell.getValue() }}</div>
        </div>
    `,
})
export class ViewCellComponent {

    static MAX_STRING_LENGTH: number = 80;
    @Input() cell: Cell;

    getStringValue(): string {
        return this.cell.getValue().length > ViewCellComponent.MAX_STRING_LENGTH ?
            this.cell.getValue().substring(0, ViewCellComponent.MAX_STRING_LENGTH) + '...' :
            this.cell.getValue();
    }

}
