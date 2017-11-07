import { Injectable }   from '@angular/core';
import { FormGroup } from '@angular/forms';
import { formConfig } from './../form.config';

@Injectable()
export class FormHelperService {

    public static isValid(form: FormGroup, fields: any[]): boolean {
        return FormHelperService.isPasswordConfirmationValid(form, fields)
            && FormHelperService.isDateRangeValid(form, fields)
            && form.valid;
    }

    public static isPasswordConfirmationValid(form: FormGroup, fields: any[]): boolean {
        let result = true;
        fields.forEach(field => {
            if (field.type === formConfig.types.PASSWORD
                && field.hasOwnProperty('confirm')) {
                result = form.controls[field.key].value === form.controls[field.confirm.key].value;
            }
        });
        return result;
    }

    public static isDateRangeValid(form: FormGroup, fields: any[]): boolean {
        let result = true;
        fields.forEach(field => {
            if (field.type === formConfig.types.DATE_RANGE) {
                let startValue = form.controls[field.startDate.key].value;
                let endValue = form.controls[field.endDate.key].value;
                if (startValue && endValue) {
                    let startDate = new Date(startValue);
                    let endDate = new Date(endValue);
                    result = startDate <= endDate;
                }
            }
        });
        return result;
    }
}
