export let formConfig = {
    types: {
        INPUT_TEXT: 'text',
        INPUT_EMAIL: 'email',
        CHECKBOX: 'checkbox',
        INPUT_SELECT: 'select'
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

