import { Component, Input, Output, EventEmitter } from '@angular/core';

import 'style-loader!./menuItem.scss';

@Component({
    selector: 'menu-item',
    templateUrl: './menuItem.html'
})
export class MenuItem {

    @Input() menuItem: any;
    @Input() child: boolean = false;

    @Output() itemHover = new EventEmitter<any>();
    @Output() toggleSubMenu = new EventEmitter<any>();

    public onHoverItem($event): void {
        this.itemHover.emit($event);
    }

    public onToggleSubMenu($event, item): boolean {
        $event.item = item;
        this.toggleSubMenu.emit($event);
        return false;
    }
}
