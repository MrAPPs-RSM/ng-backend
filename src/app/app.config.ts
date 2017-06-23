export let config = {
    env: 'prod',
    api: {
        dev: {
            baseFilesUrl: 'http://192.168.10.142:5555/files/output/',
            baseUrl: 'http://192.168.10.142:5555/api/'
        },
        prod: {
            baseFilesUrl: 'http://api-differenzia.mr-apps.com/files/output/',
            baseUrl: 'http://api-differenzia.mr-apps.com/api/'
        }
    },
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
};

