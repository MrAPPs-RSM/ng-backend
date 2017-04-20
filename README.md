# NgBackend

## Setup

First, define in src/app.config.ts the enviroment (dev, prod)
and the base URL of your APIs

app.config.ts

```typescript
export let config = {
    env: 'dev',
    api: {
        dev: {
            baseUrl: 'http://beta.json-generator.com/api/json/get/'
        },
        prod: {
            baseUrl: 'api/backend/'
        }
    }
};

```

### APIs

To define API endpoints, you have to declare them in src/app.config.ts.
They must be defined like with the following structure:
 
```json
{
  "apiName": "apiEndpoint"
}
```

Examples:

```json
{
  "api": {
    "setup": "E1utOUgTG",
    "users": "4yHf-YBTz"
  }
}
```

Now, your src/app.config.ts should look like this:

```typescript
export let config = {
    env: 'dev',
    api: {
        dev: {
            baseUrl: 'http://beta.json-generator.com/api/json/get/',
            api: {
                setup: 'E1utOUgTG',
                users: '4yHf-YBTz',
            }
        },
        prod: {
            baseUrl: 'api/backend/',
            api: {
                setup: 'setup',
                users: 'users'
            }
        }
    }
};
```

### Sidebar and menu pages

To create the sidebar, you have to define a **setup** apiName in app.config.ts.
NgBackend will start making a *GET* request to the defined endpoint.
The response must be a JSON array following some rules:

```json
[
  {
    "path": "pages",
    "children": [ 
      {
        "path": "url-path", 
        "type": "dashboard/group/list/form",
        "params": {
          "menu": {
            "title": "Dashboard",
            "icon": "ion-android-home",
            "sidebar": true, 
            "selected": false, 
            "expanded": false,
            "order": 0 
          },
          "api": {
            "name": "api-name" 
          }
        }
      }
    ]
  }
]
```

Here is an example of a /setup response that creates a sidebar with a 
dashboard, and a group that contains a list and a form

```json
[
  {
    "path": "pages",
    "children": [
      {
        "path": "dashboard",
        "type": "dashboard",
        "params": {
          "menu": {
            "title": "Dashboard",
            "icon": "ion-android-home",
            "sidebar": true,
            "selected": false,
            "expanded": false,
            "order": 0
          }
        }
      },
      {
        "path": "users",
        "type": "group",
        "params": {
          "menu": {
            "title": "Users",
            "icon": "ion-person",
            "sidebar": true,
            "selected": false,
            "expanded": false,
            "order": 100
          }
        },
        "children": [
          {
            "path": "list", 
            "type": "list",
            "params": {
             "menu": {
               "title": "Users list",
               "sidebar": true
             },
             "api": {
              "name": "users"
             },
             "table": {
               "columns": {
                "id": {
                  "title": "ID",
                  "type": "number"
                },
                "firstName": {
                  "title": "First Name",
                  "type": "string"
                },
                "lastName": {
                  "title": "Last Name",
                  "type": "string"
                },
                "age": {
                  "title": "Age",
                  "type": "number"
                }
              }
             }
            }
          },
          {
            "path": "create",
            "type": "form",
            "params": {
             "menu": {
               "title": "Create user",
               "sidebar": true
             },
             "api": {
              "name": "users"
             }
            }
          },
          {
            "path": "edit",
            "type": "form",
            "params": {
              "menu": {
                "title": "Create user",
                "sidebar": true
              },
              "api": {
                "name": "users"
              }
            }
          }
        ]
      }
    ]
  }
]
```


[Ng2Admin README.md](https://github.com/akveo/ng2-admin)