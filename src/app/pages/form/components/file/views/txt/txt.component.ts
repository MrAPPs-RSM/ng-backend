import { Component, Input } from '@angular/core';

@Component({
    selector: 'file-txt',
    templateUrl: './txt.html',
    styleUrls: ['./../../file.scss']
})
export class FileTxt {
    @Input() name: string;

    constructor() {}
}
