import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { ApiService } from '../../../../api';

@Component({
    selector: 'calendar',
    styleUrls: ['calendar.scss'],
    templateUrl: './calendar.html'
})
export class Calendar implements OnInit {

    EVENT_ACTIONS: any[] = [{
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({event}: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.activeDayIsOpen = false;
        }
    }];
    MAX_EVENTS_SHOWN: number = 4;
    EVENT_ICON: string = '';
    COLORS: any[] = [];

    @Input() form: FormGroup;
    @Input() field: any = {};

    view: string = 'month';
    viewDate: Date;
    refresh: Subject<any> = new Subject();
    events: any[] = [];
    activeDayIsOpen: boolean = false;
    @Output() eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{ event: CalendarEvent }>();

    showSelect: boolean = false;
    selectedValue: any = null;
    selectedDays: any[] = [];
    selectValues: any[] = [];

    constructor(protected _apiService: ApiService) {
    }

    ngOnInit() {
        this.viewDate = new Date();
        this.EVENT_ICON = this.field.options.eventIcon;
        this.COLORS = this.field.options.eventColors;
        this.loadSelectValues();
    }

    loadSelectValues(): void {
        if (this.field.options.selectOptions instanceof Array) {
            this.transformSelectValues(this.field.options.selectOptions);
        } else {
            this._apiService.get(this.field.options.selectOptions, false)
                .subscribe(
                    data => {
                        this.transformSelectValues(data);
                    },
                    error => {
                        console.log(error);
                        // TODO
                    }
                );
        }
    }

    transformSelectValues(array: [{ id: any, text: string }]): void {
        array.forEach((item) => {
            this.selectValues.push({
                id: item.id,
                text: '<i class="' + this.EVENT_ICON + '" style="color:'
                + this.COLORS[item.id].primary + '"></i>&nbsp;' + item.text
            });
        });
    }

    onEventClick(mouseEvent: MouseEvent, calendarEvent: CalendarEvent): void {
        if (mouseEvent.stopPropagation) {
            mouseEvent.stopPropagation();
        }
        this.eventClicked.emit({event: calendarEvent});
    }

    onDayClicked({date, events}: { date: Date, events: CalendarEvent[] }): void {
        if (
            (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
            events.length === 0
        ) {
            this.activeDayIsOpen = false;
        } else {
            this.activeDayIsOpen = true;
            this.viewDate = date;
        }
    }

    onCheckBoxClick(checked: boolean, day: any): void {
        if (checked) {
            this.selectedDays.push(day);
        } else {
            this.selectedDays = this.selectedDays.filter(selDay => selDay !== day);
        }
    }

    confirmCreation(): void {
        console.log(this.selectedValue);
        this.selectedDays.forEach((day) => {
            this.events.push({
                title: this.selectedValue.text,
                start: day.date,
                color: this.COLORS[this.selectedValue.id],
                icon: this.EVENT_ICON,
                actions: this.EVENT_ACTIONS
            });
        });

        this.selectedDays = [];
        this.refresh.next();
        this.dismissCreation();
    }

    dismissCreation(): void {
        this.showSelect = false;
        this.selectedValue = null;
    }
}
