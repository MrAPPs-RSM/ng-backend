import { Component, Input } from '@angular/core';
import { ViewCell } from '../../../components/ng2-smart-table';


@Component({
    templateUrl: './icon.html'
})
export class IconRender implements ViewCell {

    @Input() value: any;
    iconClass: string;

    ngOnInit() {
        this.iconClass = this.value !== null ? 'fa ' + this.value : null;
    }
}
