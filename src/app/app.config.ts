export let config = {
    env: 'dev',
    api: {
        dev: {
            baseUrl: 'http://beta.json-generator.com/api/json/get/',
            api: {
                login: 'login',
                setup: 'E1utOUgTG',
                users: '4yHf-YBTz',
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
            title: 'Ng2Backend',
            errorMessage: 'Wrong parameters'
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
    },
    moduleTypes: {
        dashboard: 'dashboard',
        group: 'group',
        list: 'list',
        form: 'form'
    }
};

