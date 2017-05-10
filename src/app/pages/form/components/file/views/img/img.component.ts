import { Component, Input } from '@angular/core';

@Component({
    selector: 'file-img',
    templateUrl: './img.html',
    styleUrls: ['./../../file.scss']
})
export class FileImg {
    @Input() name: string;

    constructor() {}
}
