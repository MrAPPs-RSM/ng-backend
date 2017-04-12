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
    "path": "pages", // Sidebar father component, required
    "children": [ // Now list all the components you want to have on the sidebar
      {
        "path": "url-path", // The URL path you want the component to have
        "type": "dashboard/group/list/form", // Component type, they are defined in app.config.ts
        "params": { // Params of the component
          "menu": {
            "title": "Dashboard", // Sidebar title
            "icon": "ion-android-home", // Sidebar icon 
            "sidebar": true, // Show / Not show the component in the sidebar
            "selected": false, // Component selected when ngBackend starts
            "expanded": false, // Only if type == group
            "order": 0 // Position of the component
          },
          "api": {
            "name": "api-name" // It must be defined in app.config.ts
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
            "path": "list", //Since it's a group, the path will be /users/list
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