FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn run build

FROM mhart/alpine-node:11
WORKDIR /app
RUN yarn global add serve
COPY --from=builder /app/dist/ .
