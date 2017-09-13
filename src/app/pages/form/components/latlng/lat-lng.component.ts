import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'lat-lng',
    styleUrls: ['./lat-lng.scss'],
    templateUrl: './lat-lng.html',
    encapsulation: ViewEncapsulation.None
})
export class LatLng implements OnInit{
    @Input() form: FormGroup;
    @Input() field: any = {};

    // Setup options
    options: any = this.options = this.field.hasOwnProperty('options') ? this.field.options : {};

    defaultLat: number = this.options.hasOwnProperty('defaultLat') ? this.options.defaultLat : null;
    defaultLng: number =  this.options.hasOwnProperty('defaultLng') ? this.options.defaultLng : null;

    // Marker options
    marker: any = {};

    get isValidLat() {
        return this.form.controls[this.field.lat.key].valid;
    }

    get isValidLng() {
        return this.form.controls[this.field.lng.key].valid;
    }

    constructor() {
    }

    ngOnInit() {
        this.marker = this.field.hasOwnProperty('marker') ? this.field.marker : {lat: null, lng: null, draggable: true};
        this.refreshMapPosition();
        this.refreshFormValues();
        this.onFormChange();
    }

    onFormChange(): void {
        this.form.controls[this.field.lat.key]
            .valueChanges
            .subscribe(lat => {
                this.defaultLat = lat;
                this.marker.lat = lat;
            });
        this.form.controls[this.field.lng.key]
            .valueChanges
            .subscribe(lng => {
                this.defaultLng = lng;
                this.marker.lng = lng;
            });
    }

    onMarkerChanged(event: any): void {
        this.marker.lat = event.coords.lat;
        this.marker.lng = event.coords.lng;
        this.refreshFormValues();
    }

    refreshFormValues(): void {
        let latValue = {}, lngValue = {};
        latValue[this.field.lat.key] = this.marker.lat;
        lngValue[this.field.lng.key] = this.marker.lng;
        this.form.patchValue(latValue);
        this.form.patchValue(lngValue);
    }

    refreshMapPosition(): void {
        if (!isNullOrUndefined(this.marker.lat) && !isNullOrUndefined(this.marker.lng)) {
            this.defaultLat = this.marker.lat;
            this.defaultLng = this.marker.lng;
        }
    }
}
