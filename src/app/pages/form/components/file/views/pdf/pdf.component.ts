import { Component, Input } from '@angular/core';

@Component({
    selector: 'file-pdf',
    templateUrl: './pdf.html',
    styleUrls: ['./../../file.scss']
})
export class FilePdf {
    @Input() name: string;

    constructor() {}
}
