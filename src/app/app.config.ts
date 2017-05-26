export let config = {
    env: 'dev',
    api: {
        dev: {
            baseUrl: 'http://0.0.0.0:5555/api/'
        },
        prod: {
            baseUrl: 'api/backend/'
        }
    },
    auth: {
        config: {
            title: 'SM-Differenzia',
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
};

