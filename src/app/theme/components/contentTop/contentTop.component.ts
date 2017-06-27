import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../../global.state';

@Component({
    selector: 'content-top',
    styleUrls: ['./contentTop.scss'],
    templateUrl: './contentTop.html',
})
export class ContentTop implements OnInit {

    public activePageTitle: string = '';
    public breadcrumb: any[] = [];

    constructor(protected _state: GlobalState) {
    }

    ngOnInit() {
        this._state.subscribe('menu.activeLink', (activeLink) => {
            if (activeLink) {
                this.activePageTitle = activeLink.title;
                if (activeLink.route) {
                    if (activeLink.breadcrumbLevel === 1) {
                        this.breadcrumb = [];
                        this.breadcrumb.push(activeLink);
                    } else {
                        let indexesToDelete = [];
                        this.breadcrumb.forEach((link, index) => {
                            if (link.breadcrumbLevel > activeLink.breadcrumbLevel) {
                                indexesToDelete.push(index);
                            }
                        });

                        if (indexesToDelete.length) {
                            indexesToDelete.forEach((index) => {
                                this.breadcrumb.splice(index, 1);
                            });
                        } else {
                            this.breadcrumb.push(activeLink);
                        }
                    }
                } else {
                    this.breadcrumb = [];
                }
            }
        });
    }
}
