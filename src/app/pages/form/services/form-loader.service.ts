import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formConfig } from './../form.config';

@Injectable()
export class FormLoaderService {
    constructor() { }

    createFormGroup(fields: any[] ) {
        let group: any = {};

        fields.forEach(field => {

            let validators = [];

            if (field.validators) {
                Object.keys(field.validators).forEach(key => {
                    switch (key) {
                        case formConfig.validators.REQUIRED: {
                            if (field.validators[key] === true) {
                                validators.push(Validators.required);
                            }
                        }
                            break;
                        case formConfig.validators.MIN_LENGTH: {
                            validators.push(Validators.minLength(field.validators[key]));
                        }
                            break;
                        case formConfig.validators.MAX_LENGTH: {
                            validators.push(Validators.maxLength(field.validators[key]));
                        }
                            break;
                        case formConfig.validators.PATTERN: {
                            validators.push(Validators.pattern(field.validators[key]));
                        }
                            break;
                        default: {
                        }
                            break;
                    }
                });
            }

            switch (field.type) {

                case formConfig.types.CHECKBOX: {
                    group[field.key] = new FormControl({value: null, disabled: field.disabled}, null);
                }
                    break;
                case formConfig.types.INPUT_EMAIL: {
                    validators.push(Validators.pattern(formConfig.patterns.EMAIL));
                    group[field.key] = new FormControl(
                        field.value || null,
                        Validators.compose(validators)
                    );
                }
                    break;
                default: {
                    group[field.key] = new FormControl(
                        field.value || null,
                        validators.length > 0 ? Validators.compose(validators) : null
                    );
                }
                    break;
            }
        });
        return new FormGroup(group);
    }
}
