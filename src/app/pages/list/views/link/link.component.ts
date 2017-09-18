import { Component, Input } from '@angular/core';
import { ViewCell } from '../../../components/ng2-smart-table';


@Component({
    templateUrl: './link.html'
})
export class LinkRender implements ViewCell {

    @Input() value: any;
    href: string;

    ngOnInit() {
        if (this.value.indexOf('https') === -1) {
            this.href = '//' + this.value;
        } else {
            this.href = this.value;
        }
    }
}
