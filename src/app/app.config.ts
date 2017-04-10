export let config = {
    env: 'dev',
    api: {
        dev: {
            baseUrl: 'http://beta.json-generator.com/api/json/get/',
            api: {
                menu: 'E1utOUgTG',
                users: '',
            }
        },
        prod: {
            baseUrl: 'api/backend/',
            api: {
                menu: 'menu',
                users: 'users'
            }
        }
    },
    moduleTypes: {
        dashboard: 'dashboard',
        list: 'list'
    }
};

