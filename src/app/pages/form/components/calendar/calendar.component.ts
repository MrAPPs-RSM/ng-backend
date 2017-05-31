import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes, isSameDay } from 'date-fns';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/first';
import { ApiService } from '../../../../api';
import { isNullOrUndefined } from 'util';
import { Utils } from '../../../../utils';
import { ToastHandler } from '../../../../theme/services';

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

    constructor(protected _apiService: ApiService,
                protected _toastHandler: ToastHandler) {
    }

    ngOnInit() {
        if (this.field.options.multipleSelect) {
            this.selectedValues = [];
        }
        this.viewDate = new Date();
        this.EVENT_ICON = this.field.options.eventIcon;
        this.loadCalendar();
    }

    loadEventsColors(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.field.options.eventColors instanceof Object) {
                this.COLORS.custom = this.field.options.eventColors;
                resolve();
            } else {
                this._apiService.get(this.field.options.eventColors, false)
                    .subscribe(
                        data => {
                            this.COLORS.custom = data;
                            resolve();
                        },
                        error => {
                            this._toastHandler.error(error);
                            reject();
                        }
                    );
            }
        });
    }

    loadSelectValues(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.field.options.select.values instanceof Array) {
                this.selectValues = this.field.options.select.values;
                resolve();
            } else {
                this._apiService.get(this.field.options.select.values, false)
                    .subscribe(
                        data => {
                            this.selectValues = data;
                            resolve();
                        },
                        error => {
                            this._toastHandler.error(error);
                            reject();
                        }
                    );
            }
        });
    }

    loadCalendar(): void {
        this.form.controls[this.field.key].valueChanges
            .first()
            .subscribe(data => {
                this.loadSelectValues().then(() => {
                    this.loadEventsColors().then(() => {
                        data.forEach((item) => {
                            // TODO: actually not-standard
                            let event = {
                                id: null,
                                title: null,
                                color: !isNullOrUndefined(this.COLORS.custom[item.bidoneId]) ?
                                    this.COLORS.custom[item.bidoneId] : this.COLORS.default,
                                start: new Date(item.giorno),
                                icon: this.EVENT_ICON,
                                actions: this.EVENT_ACTIONS
                            };
                            this.selectValues.forEach((selectValue) => {
                                if (item.bidoneId === selectValue.id) {
                                    event.id = item.id;
                                    event.title = selectValue.text;
                                }
                            });

                            this.events.push(event);
                        });
                        this.refresh.next();
                        this.refreshFormValue();
                    });
                });
            });
    }

    onEventClick(mouseEvent: MouseEvent, calendarEvent: CalendarEvent): void {
        if (mouseEvent.stopPropagation) {
            mouseEvent.stopPropagation();
        }
        this.eventClicked.emit({event: calendarEvent});
    }

    onDayEventsClicked({date, events}: { date: Date, events: CalendarEvent[] }): void {
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

    onDayClick(day: any): void {
        if (!Utils.containsObject(day, this.selectedDays)) {
            day.cssClass = 'cal-day-selected';
            this.selectedDays.push(day);
        } else {
            delete day.cssClass;
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
        if (indexes.length > 0) {
            indexes.forEach((index) => {
                delete this.events[index];
            });
            this.refresh.next();
            this.refreshFormValue();
        }
    }
}
