import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Grid } from '../../lib/grid';

@Component({
    selector: '[ng2-st-tbody]',
    styleUrls: ['./tbody.component.scss'],
    templateUrl: './tbody.component.html',
})
export class Ng2SmartTableTbodyComponent {

    @Input() grid: Grid;
    @Input() source: any;
    @Input() enableDrag: boolean;

    @Output() save = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<any>();
    @Output() edit = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();
    @Output() custom = new EventEmitter<any>();
    @Output() edited = new EventEmitter<any>();
    @Output() userSelectRow = new EventEmitter<any>();
    @Output() editRowSelect = new EventEmitter<any>();
    @Output() multipleSelectRow = new EventEmitter<any>();
    @Output() rowHover = new EventEmitter<any>();
}
