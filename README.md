# Mercado Libre Test - React APP

Mercado Libre Frontend Test App built with [React](https://reactjs.org/).

This project depends on the [Mercado Libre Test - API](https://github.com/cyberxander90/ml-api), so you must have it running.

## Run

### Install Dependencies
```
> npm install
```

### Run for development
```
> npm start
```

Default **start** for [CRA](https://github.com/facebook/create-react-app)

(http://localhost:3000).

### Run build as SPA
```
> npm serve
```

Build the project and serve the build files for http using [http-server](https://github.com/indexzero/http-server).

(http://localhost:8080)

### Run SSR
```
> npm serve-ssr
```

Build the project and start a simple [express](http://expressjs.com/) server to serve the app with **SSR**

(http://localhost:3000).
**This is the preferred way to test the App**.

## Env
You can setup your **.env** file to override the defaults props

- PORT=3001
- REACT_APP_BASE_API_URL=http://localhost:3001/api
- REACT_APP_FACEBOOK_APP_ID
