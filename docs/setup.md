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

| Name   | Type   | Required | Available options               | Description                                                                                                               |
|--------|--------|----------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| path   | string | yes      |                                 | The path that the component must match (example: users => www.backend.com/pages/users)                                    |
| type   | string | yes      | dashboard / list / form / group | Defines which type of component the page must load. If you select a group, then you can define other components inside it |
| params | Object | yes      |                                 | List of parameters that defines the component behaviour                                                                   |