export let config = {
    env: 'dev',
    api: {
        dev: {
            baseUrl: 'http://beta.json-generator.com/api/json/get/',
            api: {
                setup: 'E1utOUgTG',
                users: '',
            }
        },
        prod: {
            baseUrl: 'api/backend/',
            api: {
                setup: 'setup',
                users: 'users'
            }
        }
    },
    moduleTypes: {
        dashboard: 'dashboard',
        group: 'group',
        list: 'list'
    }
};

