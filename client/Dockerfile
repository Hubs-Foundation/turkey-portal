# syntax=docker/dockerfile:1
ARG NODE_VERSION=18

FROM node:$NODE_VERSION-alpine AS base
# ---- dev stage ----
FROM base AS dev
COPY container/conditional-npm-ci /usr/local/bin/conditional-npm-ci
# ---- build stage ----
FROM base AS builder
arg GITHUB_TOKEN
workdir client
COPY . .
ENV GITHUB_TOKEN=$GITHUB_TOKEN
RUN npm install && npm run build
# ---- app stage ----
FROM base
run apk add curl
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /client ./
USER nobody
CMD yarn run start
