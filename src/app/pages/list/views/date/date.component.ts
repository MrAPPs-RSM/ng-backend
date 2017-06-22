import { Component, Input } from '@angular/core';
import { ViewCell } from '../../../ng2-smart-table';
import { NguiDatetime } from '@ngui/datetime-picker';

@Component({
    templateUrl: './date.html'
})
export class DateRender implements ViewCell {

    rowData: any;
    renderValue: string;

    @Input() value: any;

    ngOnInit() {
        let date = new Date(this.value);
        this.renderValue = NguiDatetime.formatDate(date);
    }
}
