import { env } from './app.env';

export let config = Object.assign({}, env, {
    title: 'SM-Differenzia',
    auth: {
        config: {
            api: 'persons/login'
        },
        fields: [
            {
                key: 'username',
                type: 'text',
                label: 'Username',
                placeholder: 'Username',
                validators: {
                    required: true
                }
            },
            {
                key: 'password',
                type: 'password',
                label: 'Password',
                placeholder: 'Password',
                validators: {
                    required: true,
                    minLength: 4
                }
            }
        ]
    }
});
