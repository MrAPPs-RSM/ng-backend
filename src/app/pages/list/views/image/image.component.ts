import { Component, Input } from '@angular/core';
import { ViewCell } from '../../../components/ng2-smart-table';
import { config } from '../../../../app.config';


@Component({
    templateUrl: './image.html'
})
export class ImageRender implements ViewCell {

    rowData: any;
    renderValue: string;

    @Input() value: any;

    ngOnInit() {

        if (this.value !== null) {
            if ('production' === ENV || 'renderer' === ENV) {
                this.renderValue = config.api.prod.baseFilesUrl + this.value;
            } else {
                this.renderValue = config.api.dev.baseFilesUrl + this.value;
            }
        } else {
            this.renderValue = '../../../assets/images/no-image.png';
        }
    }
}
