# Clever sample project - Frontend

> This app is the demo for Platform project

## Installation guide

 1. Run `yarn` to install essential dependencies. <b>Don't run `npm install` because it can cause problems with the app</b>
  ** Note: install more: yarn add react-window@next, if it still have problem related to install dependencies
 2. Change your GraphQL Server url in `.env.dev` following  syntax `APOLLO_SERVER=http://<server-ip-address>:4000/graphql` if the server is not deployed in your local. The default server is `http://localhost:4000/graphql` (see in .env.dev)
 3. Run `yarn start:development` to start the web app. The app will run at `localhost:3000`
 4. Run `yarn cy:open` to see the end to end test results of sign in and sign up
 5. To run with docker, install docker and docker-compose

- start:
  `docker-compose -f docker-compose.yml up --build --force-recreate`
- stop:
  `docker-compose -f docker-compose.yml down`

## Run storybook

1. Run `yarn storybook`
