import { Component, Input } from '@angular/core';

@Component({
    selector: 'file-default',
    templateUrl: './default.html',
    styleUrls: ['./../../file.scss']
})
export class FileDefault {
    @Input() name: string;

    constructor() {}
}
