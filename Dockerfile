FROM mhart/alpine-node:11

## caching npm modules installation
RUN mkdir -p /tmp/npm/
ADD package.json /tmp/npm/
RUN cd /tmp/npm/ && yarn && yarn add react-window@next

## copy sources and build
WORKDIR /usr/src/app
COPY . ./
RUN rm -rf ./node_modules
RUN cp -a /tmp/npm/node_modules /usr/src/app
RUN yarn run build
