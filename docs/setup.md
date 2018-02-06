# Setup

Create a file named **app.env.ts** in the following path:
```bash
/src/app/app.env.ts
```
This is the file that defines the base endpoint for the APIs

Example:

```typescript
export let env = {
    env: 'dev',
    api: {
        dev: {
            baseFilesUrl: '',
            baseUrl: 'http://localhost:5000/api/'
        },
        prod: {
            baseFilesUrl: '',
            baseUrl: 'http://prod.server.com/api/'
        }
    }
};
```

**Note:** *baseFilesUrl* is only required if your files are uploaded to your server and you are not using external services (like Google Cloud)
**Note:** In the future versions it will be removed

# Login

Your login form needs some configuration, and the defaults can be changed in **/src/app/app.config.ts**

You can define some form fields options (username/password, email/password), but more important you must define the **title** of your backend and the **setupEndpoint**

**setupEndpoint**: It defines the endpoint that the system will call to load everything (menu, pages, routes...)

Example: if your **setupEndpoint** is 'setup', the first HTTP Request that will be done is *http://base.endpoint/api/setup*

**Auth configuration**: The system needs also to know what will be the endpoint to login the user. You can define it like the following example:

Example of the **app.config.ts**

```json
{
  "title": "Ng2Backend",
  "setupEndpoint": "setup",
  "auth": {
    "config": {
      "api": "login"
    },
    "fields": [
      {
        "key": "username",
        "type": "text",
        "label": "Username",
        "placeholder": "Username",
        "validators": {
          "required": true
        }
      },
      {
        "key": "password",
        "type": "password",
        "label": "Password",
        "placeholder": "Password",
        "validators": {
          "required": true
        }
      }
    ]
  }
}
```

Result:

![alt text](https://github.com/MrAPPs-RSM/ng-backend/blob/master/docs/examples/login.png)


# Panel configuration

How to start generate menus, forms, lists?

The route that you've defined in **setupEndpoint**, must return a JSON Array that respect some rules.

Each item of that array is a JSON Object which might have the following options.

Please note that the **DASHBOARD** component is required. (An example can be found at the end of this page).

| Name     | Type   | Required | Available options               | Description                                                                                                               |
|----------|--------|----------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| path     | string | yes      |                                 | The path that the component must match (example: users => www.backend.com/pages/users)                                    |
| type     | string | yes      | dashboard / list / form / group | Defines which type of component the page must load. If you select a group, then you can define other components inside it |
| params   | Object | yes      |                                 | List of parameters that defines the component behaviour                                                                   |
| children | Array  | no       |                                 | Only for type: group, it's an array composed by JSON objects of the same type of ones that defines components             |


### Params object

**Params** is the main key of the JSON Object. Here are the rules:

| Name                  | Type    | Required | Available options               | Description                                                          |
|-----------------------|---------|----------|---------------------------------|----------------------------------------------------------------------|
| menu                  | Object  | yes      |                                 | Options to define menu settings                                      |
| api                   | Object  | yes      |                                 | Options to define api settings                                       |
| table                 | Object  | no       |                                 | If your component is a list, you have to define the **table** object |
| form                  | Object  | no       |                                 | If your component is a form, you have to define the **table** object |


### Menu: 

| Name             | Type    | Required | Available options               | Description                                                                                                               |
|------------------|---------|----------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| title            | string  | yes      |                                 | Title that will be displayed in the sidebar menu and as page title                                                        |
| icon             | string  | no       | fa fa-* / ion-*                 | Icon that will be displayed in the sidebar menu. (FontAwesome or Ionicons)                                                |
| sidebar          | boolean | yes      | true / false                    | Show/hide page in the sidebar menu                                                                                        |
| expanded         | boolean | no       | true / false                    | Only if type = group, defines if the sub-menu of the group must be expanded when page loads                               |
| order            | number  | no       |                                 | Defines the order in which menu item will be displayed in the sidebar                                                     |
| breadcrumbLevel  | number  | no       |                                 | Defines the element level in the breadcrumb (usually, sub-items have a number > parent-item)                              |

### Api: 

**Notes**: 

Since Ng2Backend is based on a REST API structure, the endpoint of the components is the same for *GET*, *POST*, *PUT*, *PATCH* and *DELETE*. (These are the 5 HTTP Request types that components can do).
So, for example, if you have a list of users, your configuration might be the following:

```json
 {
   "api": {
     "endpoint": "users"
   }
 }
```

In this case, the list component will do the following requests:

- *GET* /users/count (to count the data)
- *GET* /users (to fetch the data)
- *DELETE* /users/:id (if enabled)

Then, if you want to edit or create users, you will probably have a form component with the following configuration:

```json
 {
   "api": {
     "endpoint": "users"
   }
 }
```

In this case, the form component will do the following requests:

- *GET* /users/:id (if is an edit form, this method will retrieve the current user's data)
- *PATCH* /users/:id (if is an edit form, this method will update the user's data)
- *PUT* /users (if is a creation form, this method will create a new user)

**Only for list components**:
In case you need to define different endpoints for count your data you can define it thanks to the *countEndpoint* field

The list components also allows you to **sort** your data. To do this you need some initial setup:

- Your data must have a field named **weight**.
- You have to define a **sortEndpoint**. Then, when the ordering event fires (drag&drop on table rows), the component will make a *PATCH* request to that endpoint sending the following data structure: {oldIndex: number, newIndex: number}

| Name                  | Type    | Required | Available options                                                    | Description                                                                                                               |
|-----------------------|---------|----------|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| endpoint              | string  | yes      |                                                                      | Relative path that the component will call for managing data (GET, PUT, PATCH, DELETE...)                                 |
| filter                | string  | no       | See [this docs](https://loopback.io/doc/en/lb2/Querying-data.html)   | Filter applied to the query that retrieves data (works smoothly with Loopback)                                            |
| sortEndpoint          | string  | no       |                                                                      | Explained above                                                                                                           |
| countEndpoint         | string  | no       |                                                                      | Custom endpoint to replace the default auto-generated *endpoint/count*                                                    |