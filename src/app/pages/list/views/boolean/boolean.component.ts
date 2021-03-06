import { Component, Input } from '@angular/core';
import { ViewCell } from '../../../components/ng2-smart-table';


@Component({
    templateUrl: './boolean.html'
})
export class BooleanRender implements ViewCell {

    rowData: any;
    renderValue: boolean;

    @Input() value: any;

    ngOnInit() {
        this.renderValue = (this.value === '1' || this.value === 1 || this.value === 'true' || this.value === true);
    }
}
