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

**Options**

| Name                 | Type    | Required | Description                                                                                                                                                                       |
|----------------------|---------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| path                 | string  | yes      | Url path that page must match (i.e. dashboard => www.mywebsite.com/dashboard)                                                                                                     |
| type                 | string  | yes      | Defines which type of component the page must load. (**dashboard**,** list**, **form**). It's also possibile to define a **group** type to create multi-level menu in the sidebar |
| params               | Object  | yes      | Component params                                                                                                                                                                  |
| params.menu          | Object  | yes      | Options related with the menu                                                                                                                                                     |
| params.menu.title    | string  | yes      | Title that will be displayed in the sidebar menu and as page title                                                                                                                |
| params.menu.icon     | string  | no       | Icon that will be displayed in the sidebar menu. (All icons available [here](http://ionicons.com/)                                                                                |
| params.menu.sidebar  | boolean | yes      | Show/hide page in the sidebar menu                                                                                                                                                |
| params.menu.selected | boolean | no       | Defines if the page must be selected when page loads                                                                                                                              |
| params.menu.expanded | boolean | no       | Only if type = **group**, defines if the sub-menu of the group must be expanded when page loads                                                                                   |
| params.menu.order    | number  | no       | Defines the order in which menu items will be displayed                                                                                                                           |
| api                  | Object  | yes      | Object that defines api parameters for the component                                                                                                                              |
| api.name             | string  | yes      | Api name defined in app.config.ts                                                                                                                                                 |

Example:

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
            "expanded": true,
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
                "title": "Edit user",
                "sidebar": false
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


## Components

### List

To create a list page, you must define the structure in the setup JSON.

**Table params**

| Name                | Type    | Required | Description                                         |
|---------------------|---------|----------|-----------------------------------------------------|
| table               | Object  | yes      | Table object that defines its structure             |
| table.actions       | Object  | yes      | Actions object that defines table possible actions  |
| actions.columnTitle | string  | yes      | Column title                                        |
| actions.position    | string  | yes      | Defines where to show table actions (left or right) |
| actions.add         | boolean | yes      | Enable/disable add action                           |
| actions.edit        | boolean | yes      | Enable/disable edit action                          |
| table.columns       | Array   | yes      | Structure of the table columns                      |
| table.columns[KEY]  | string  | yes      | Key name of the field                               |

**Column params**

| Name                       | Type            | Required | Description                                                                                                                                          |
|----------------------------|-----------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| title                      | string          | yes      | Column title (it appears on top of the table)                                                                                                        |
| type                       | string          | yes      | Column type (boolean, number, string)                                                                                                                |
| filter                     | Object | false  | no       | Column filter, if false no filter will be applied to the column. If not defined, base filter (text) will be applied                                  |
| filter.type                | string          | no       | Defines the filter type if it mustn't be text. Possibile values are **checkbox** for boolean values or **list** to create a filter with a select-input.  |
| filter.config              | Object          | no       | Required only if filter.type = list                                                                                                                  |
| filter.config.selectText   | string          | no       | Select placeholder where no value is selected                                                                                                        |
| filter.config.dataEndpoint | string          | no       | Data endpoint (full url) to call to retrieve data to populate select options                                                                         |

Example

```json
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
         "actions": {
            "columnTitle": "Actions",
            "add": true,
            "edit": true,
            "delete": true,
            "position": "right"
         },
         "columns": {
            "active": {
               "title": "Active",
               "type": "boolean",
               "filter": {
                  "type": "checkbox"
               }
            },
            "age": {
               "title": "Age",
               "type": "number",
               "filter": false
            },
            "username": {
               "title": "Username",
               "type": "string"
            },
            "email": {
               "title": "E-mail",
               "type": "string"
            },
            "lastName": {
               "title": "Last Name",
               "type": "string",
               "filter": {
                  "type": "list",
                  "config": {
                     "selectText": "Select last name...",
                     "dataEndpoint": "http://beta.json-generator.com/api/json/get/4yhx6nC6z"
                  }
               }
            },
            "firstName": {
               "title": "First Name",
               "type": "string",
               "filter": {
                  "type": "list",
                  "config": {
                     "selectText": "Select...",
                     "dataEndpoint": "http://beta.json-generator.com/api/json/get/4JAQ2206z"
                  }
               }
            },
            "id": {
               "title": "ID",
               "type": "number"
            }
         }
      }
   }
}
```

## Forms






[Ng2Admin README.md](https://github.com/akveo/ng2-admin)