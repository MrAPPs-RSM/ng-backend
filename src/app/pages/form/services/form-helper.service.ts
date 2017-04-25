import { Injectable }   from '@angular/core';
import { FormGroup } from '@angular/forms';
import { formConfig } from './../form.config';

@Injectable()
export class FormHelperService {

    public static isValid(form: FormGroup, fields: any[]): boolean{
        return FormHelperService.isPasswordConfirmationValid(form, fields) && form.valid;
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
}
