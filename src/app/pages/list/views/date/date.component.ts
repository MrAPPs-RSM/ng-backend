import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
    templateUrl: './date.html'
})
export class DateRender implements ViewCell {

    renderValue: string;

    @Input() value: any;

    ngOnInit() {
        let date = new Date(this.value);
        this.renderValue =
            date.getUTCFullYear() + '/' +
            this.addLeadingZero(date.getUTCMonth()) + '/' +
            this.addLeadingZero(date.getUTCDate()) + ' ' +
            this.addLeadingZero(date.getUTCHours()) + ':' +
            this.addLeadingZero(date.getUTCMinutes()) + ':' +
            this.addLeadingZero(date.getUTCSeconds());
    }

    addLeadingZero(value: number): string | number {
        return value < 10 ? '0' + value : value;
    }
}
