# Ng2Backend

![alt text](https://github.com/MrAPPs-RSM/ng-backend/blob/master/docs/examples/dashboard.png)

## Clone & download

```bash
git clone https://github.com/MrAPPs-RSM/ng-backend.git
```

## Initial setup

Create a file named **app.env.ts** in the following path:
```bash
/src/app/app.env.ts
```
This is the file that defines the base endpoint for the APIs

**Note:** *baseFilesUrl* is only required if your files are uploaded to your server and you are not using external services (like Google Cloud)
**Note:** In the future versions it will be removed

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

## Install

```bash
npm install
```

## Run on local server

```bash
npm start
```

App will be served in: 

```bash
http://localhost:3000
```

## Deploy

```bash
npm run build:prod
```

All static HTML files will be generated into /dist directory, then you can simply upload this folder into any web server

For further documentation go and check: [docs](https://github.com/MrAPPs-RSM/ng-backend/tree/master/docs)
