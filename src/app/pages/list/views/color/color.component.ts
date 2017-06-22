import { Component, Input } from '@angular/core';
import { ViewCell } from '../../../ng2-smart-table';


@Component({
    templateUrl: './color.html'
})
export class ColorRender implements ViewCell {

    rowData: any;
    renderValue: string;

    @Input() value: any;

    ngOnInit() {
        this.renderValue = this.value;
    }
}
