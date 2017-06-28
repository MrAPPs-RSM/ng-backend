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
        this.renderValue = this.value !== null ? config.api[config.env].baseFilesUrl + this.value :
        '../../../assets/images/no-image.png'; // TODO service that load placeholder url ?
    }
}
