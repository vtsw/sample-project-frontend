FROM mhart/alpine-node:11
WORKDIR /app
COPY . .
#RUN yarn add webpack webpack-cli webpack-dev-server
RUN yarn
RUN yarn run build

#FROM mhart/alpine-node:11
#WORKDIR /app
#RUN yarn global add serve
#COPY --from=builder /app/dist/ .
