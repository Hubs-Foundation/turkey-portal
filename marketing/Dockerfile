# syntax=docker/dockerfile:1
ARG NODE_VERSION=18

FROM node:$NODE_VERSION-alpine AS base
# ---- dev stage ----
FROM base AS dev
# ---- build stage ----
FROM base AS builder
arg GITHUB_TOKEN
arg ENV
arg CONTENTFUL_TOKEN_b64
workdir client
COPY . .
ENV GITHUB_TOKEN=$GITHUB_TOKEN
RUN echo "ENV: $ENV, CONTENTFUL_TOKEN-last4: ${CONTENTFUL_TOKEN_b64: -4}"
RUN npm config set -- "//npm.pkg.github.com/:_authToken" "$GITHUB_TOKEN" && npm install && CONTENTFUL_TOKEN=$(echo $CONTENTFUL_TOKEN_b64 | base64 -d) npm run build
# ---- app stage ----
FROM base
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /client ./
USER nobody
CMD yarn run start
