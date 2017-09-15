import { Component, Input } from '@angular/core';
import { ViewCell } from '../../../components/ng2-smart-table';


@Component({
    templateUrl: './color.html',
    styleUrls: ['./color.scss'],
})
export class ColorRender implements ViewCell {

    rowData: any;
    renderValue: string;

    @Input() value: any;

    ngOnInit() {
        this.renderValue = this.value;
    }
}
