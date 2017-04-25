export let formConfig = {
    types: {
        TEXT: 'text',
        EMAIL: 'email',
        PASSWORD: 'password',
        CHECKBOX: 'checkbox',
        SELECT: 'select',
        DATE: 'date',
        DATE_RANGE: 'date_range'
    },
    validators: {
        REQUIRED: 'required',
        MIN_LENGTH: 'minLength',
        MAX_LENGTH: 'maxLength',
        PATTERN: 'pattern'
    },
    patterns: {
        EMAIL: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i
    }
};

