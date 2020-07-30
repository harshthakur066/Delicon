# Delicon B2B Web-App

Delicon B2B project is based on MERN Stack (Mongo, Express, React and Node).

For front-end react, react-router-dom, redux, mongo DB charts for analytics graphs and
material UI libraries for styling and components are used.
For backend node with express JWT for authentication and mongo DB Atlas as database are
used.

Project has proper naming conventions and comments for explaining the working and the
file itself.

## To Start

1. clone the repo

2. `npm install && cd client && npm install`

3. `npm run server` // To start only server

4. `npm run dev` // To start both server and client

## Login Credentials

Business Owner:

1. Email: pranav@gmail.com
2. Password: 123456

Staff:

1. Email: pg123@gmail.
2. Password: 123456

## Deployment

The deployment of the application is bit confusing so it is very important to understand
properly.

The web-app is deployed to Heroku.
The confusion is created because of redux dev tool extension for development purpose, the
deliconb2b repository is for development of the client side of the web-app which includes
redux dev tool extension as a middleware in redux. But to deploy the developer has to
remove it first as middleware i.e. in src/redux/store.js file on line 23.

It is written like this

`compose( applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ () )`

and the developer has to edit it like this

`compose(applyMiddleware(...middleware))`

### Note

**Don’t edit this on deliconb2b repo copy all the files of deliconb2b and replace it in the
main repo reservation-module which is for continuous deployment in client folder and
edit the store.js as mentioned above and then push to master.**

Then only it will work properly in deployment, otherwise it won’t work on the devices
which doesn’t have redux dev tools extension mainly mobiles and clients.

It is bit overwork to copy and paste files from one repo to other every time for deployment
but if any developer finds a solution to the problem of redux dev tool extension work
depending on the environment it would be nice.

**Please add issues to the repository if necessary.**
