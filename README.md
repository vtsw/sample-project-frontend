# Clever sample project - Frontend

> This app is the demo for Platform project

## Installation guide

 1. Run `yarn` to install essential dependencies. <b>Don't run `npm install` because it can cause problems with the app</b>
 2. Add your GraphQL Server url in `configs.local.js`
 3. Run `yarn start` to start the web app. The app will run at `localhost:3000`
 4. Run `yarn cy:open` to see the end to end test results of sign in and sign up
 5. To run with docker, install docker and docker-compose
  - start: 
  `docker-compose -f docker-compose.yml up --build --force-recreate`
  - stop: 
  `docker-compose -f docker-compose.yml down`
