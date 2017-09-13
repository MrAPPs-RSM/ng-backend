import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'divider',
    styleUrls: ['./divider.scss'],
    templateUrl: './divider.html',
    encapsulation: ViewEncapsulation.None
})

export class Divider implements OnInit{
    @Input() field: any = {};

    constructor() {}

    ngOnInit() {

    }
}
