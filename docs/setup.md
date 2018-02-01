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
  "title": "My new Backend",
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

# Panel configuration

How to start generate menus, forms, lists?


