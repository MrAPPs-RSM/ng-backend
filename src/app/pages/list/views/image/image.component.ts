import {Component, Input} from '@angular/core';
import {ViewCell} from '../../../components/ng2-smart-table';
import {config} from '../../../../app.config';


@Component({
    templateUrl: './image.html'
})
export class ImageRender implements ViewCell {

    rowData: any;
    renderValue: string;

    @Input() value: any;

    ngOnInit() {
        if (this.value) {
            if (typeof this.value === 'string') {
                this.renderValue = config.api[config.env].baseFilesUrl + this.value;
            } else {
                // Google Cloud object
                this.renderValue = this.value.thumbnails.small;
            }
        } else {
            this.renderValue = '../../../assets/images/no-image.png';
        }
    }
}
