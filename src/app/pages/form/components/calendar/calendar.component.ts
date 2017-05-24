import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes, isSameDay } from 'date-fns';
import { Subject } from 'rxjs';
import { ApiService } from '../../../../api';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'calendar',
    styleUrls: ['./calendar.scss'],
    templateUrl: './calendar.html'
})
export class Calendar implements OnInit {

    /** Fixed values */
    EVENT_ACTIONS: any[] = [{
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({event}: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.activeDayIsOpen = false;
            this.refreshFormValue();
        }
    }];
    MAX_EVENTS_SHOWN: number = 4;
    EVENT_ICON: string = '';
    COLORS: any = {
        default: {
            primary: '#000000',
            secondary: '#ffffff'
        },
        custom: []
    };

    /** I/O */
    @Input() form: FormGroup;
    @Input() field: any = {};
    @Output() eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{ event: CalendarEvent }>();

    /** Calendar values */
    view: string = 'month';
    viewDate: Date;
    refresh: Subject<any> = new Subject();
    events: any[] = [];
    activeDayIsOpen: boolean = false;

    /** Select and event creation values */
    showSelect: boolean = false;
    selectedValues: any = null;
    selectedDays: any[] = [];
    selectValues: any[] = [];

    constructor(protected _apiService: ApiService) {
    }

    ngOnInit() {
        if (this.field.options.multipleSelect) {
            this.selectedValues = [];
        }
        this.viewDate = new Date();
        this.EVENT_ICON = this.field.options.eventIcon;
        this.COLORS.custom = this.field.options.eventColors;
        this.loadSelectValues();
    }

    loadSelectValues(): void {
        if (this.field.options.selectOptions instanceof Array) {
            this.selectValues = this.field.options.selectOptions;
            // this.transformSelectValues(this.field.options.selectOptions);
        } else {
            this._apiService.get(this.field.options.selectOptions, false)
                .subscribe(
                    data => {
                        this.selectValues = data;
                        // this.transformSelectValues(data);
                    },
                    error => {
                        console.log(error);
                        // TODO
                    }
                );
        }
    }

    /* transformSelectValues(array: [{ id: any, text: string }]): void {
        array.forEach((item) => {
            let color = !isNullOrUndefined(this.COLORS.custom[item.id]) ?
                this.COLORS.custom[item.id].primary : this.COLORS.default;
            this.selectValues.push({
                id: item.id,
                text: '<i class="' + this.EVENT_ICON + '" style="color:' + color + '"></i>&nbsp;' + item.text
            });
        });
    } */

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

        this.selectedDays.forEach((day) => {
            if (this.selectedValues instanceof Array) {
                this.selectedValues.forEach((selectedValue) => {
                    this.events.push({
                        id: selectedValue.id,
                        title: selectedValue.text,
                        start: setHours(setMinutes(day.date, 0), 0),
                        color: !isNullOrUndefined(this.COLORS.custom[selectedValue.id]) ?
                            this.COLORS.custom[selectedValue.id] : this.COLORS.default,
                        icon: this.EVENT_ICON,
                        actions: this.EVENT_ACTIONS
                    });
                });
            } else {
                this.events.push({
                    id: this.selectedValues.id,
                    title: this.selectedValues.text,
                    start: setHours(setMinutes(day.date, 0), 0),
                    color: !isNullOrUndefined(this.COLORS.custom[this.selectedValues.id]) ?
                        this.COLORS.custom[this.selectedValues.id] : this.COLORS.default,
                    icon: this.EVENT_ICON,
                    actions: this.EVENT_ACTIONS
                });
            }
        });

        this.selectedDays = [];
        this.refresh.next();
        this.dismissCreation();
        this.refreshFormValue();
    }

    dismissCreation(): void {
        this.showSelect = false;
        this.selectedValues = [];
    }

    refreshFormValue(): void {
        let data = [];
        this.events.forEach((event) => {
            data.push({
                eventId: event.id,
                date: event.start
            });
        });
        this.form.controls[this.field.key].setValue(data);
    }

    clearAllEventsByDay(): void {
        let indexes: number[] = [];
        this.selectedDays.forEach((day) => {
            this.events.forEach((event, index) => {
                if (event.start.getDate() === day.date.getDate()
                && event.start.getMonth() === day.date.getMonth()
                && event.start.getUTCFullYear() === day.date.getUTCFullYear()) {
                    indexes.push(index);
                }
            });
        });

        this.selectedDays = [];
        console.log(indexes);
        if (indexes.length > 0) {
            indexes.forEach((index) => {
                console.log('removing ' + this.events[index]);
                delete this.events[index];
            });
            this.refresh.next();
            this.refreshFormValue();
        }
    }
}