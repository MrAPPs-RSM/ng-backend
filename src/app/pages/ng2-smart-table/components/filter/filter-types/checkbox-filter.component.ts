import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DefaultFilter } from './default-filter';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'checkbox-filter',
    template: `
        <label class="checkbox-inline custom-checkbox nowrap">
            <input type="checkbox"
                   [formControl]="inputControl"
                   class="form-control"
                   [ngClass]="inputClass">
            <span>
            </span>
        </label>
        <span *ngIf="filterActive" (click)="resetFilter($event)" style="cursor: pointer">
            <small>Reset</small>
        </span>
    `,
})
export class CheckboxFilterComponent extends DefaultFilter implements OnInit {

    filterActive: boolean = false;
    inputControl = new FormControl();

    constructor() {
        super();
    }

    ngOnInit() {
        this.changesSubscription = this.inputControl.valueChanges
            .debounceTime(this.delay)
            .subscribe((checked: boolean) => {
                this.filterActive = true;
                const trueVal = (this.column.getFilterConfig() && this.column.getFilterConfig().true) || true;
                const falseVal = (this.column.getFilterConfig() && this.column.getFilterConfig().false) || false;
                this.query = checked ? trueVal : falseVal;
                this.setFilter();
            });
    }

    resetFilter(event: any) {
        event.preventDefault();
        this.query = null;
        this.inputControl.setValue(false, {emitEvent: false});
        this.filterActive = false;
        this.setFilter();
    }
}
