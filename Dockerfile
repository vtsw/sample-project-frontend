FROM mhart/alpine-node:11
WORKDIR /app
COPY . .
#RUN yarn add webpack webpack-cli webpack-dev-server
RUN yarn
RUN yarn add react-window@next
RUN yarn run build
#FROM mhart/alpine-node:11
#WORKDIR /app
#RUN yarn global add serve
#COPY --from=builder /app/dist/ .
