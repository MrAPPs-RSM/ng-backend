import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export class CustomValidators {

    static max(max: number): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if (isNullOrUndefined(max)) return null;
            if (!isNullOrUndefined(Validators.required(control))) return null;

            let v: number = +control.value;
            return v <= +max ? null : {actualValue: v, requiredValue: +max, max: true};
        };
    }

    static min(min: number): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if (isNullOrUndefined(min)) return null;
            if (!isNullOrUndefined(Validators.required(control))) return null;

            let v: number = +control.value;
            return v >= +min ? null : {actualValue: v, requiredValue: +min, min: true};
        };
    }

    static email(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if (!isNullOrUndefined(Validators.required(control))) return null;

            let v: string = control.value;
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) ? null : {'email': true};
        };
    }
}
