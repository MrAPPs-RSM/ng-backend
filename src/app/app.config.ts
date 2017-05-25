export let config = {
    env: 'dev',
    api: {
        dev: {
            baseUrl: 'http://0.0.0.0:5555/api/',
            api: {
                login: 'persons/login',
                setup: 'setup',
                zone: 'zone'
            }
        },
        prod: {
            baseUrl: 'api/backend/',
            api: {
                login: 'login',
                setup: 'setup',
                users: 'users'
            }
        }
    },
    auth: {
        config: {
            title: 'SM-Differenzia'
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

