# ---- build stage ----
FROM node:18-alpine as builder
arg GITHUB_TOKEN
arg CONTENTFUL_TOKEN
workdir client
COPY . .
ENV GITHUB_TOKEN=$GITHUB_TOKEN
ENV CONTENTFUL_TOKEN=$CONTENTFUL_TOKEN
run echo "GITHUB_TOKEN: ${GITHUB_TOKEN: -2}"
run echo "CONTENTFUL_TOKEN: ${CONTENTFUL_TOKEN: -2}"
RUN npm config set -- "//npm.pkg.github.com/:_authToken" "$GITHUB_TOKEN" && \
    npm install --legacy-peer-deps  && \
    CONTENTFUL_TOKEN=$CONTENTFUL_TOKEN_DEV npm run build
# ---- app stage ----
FROM node:18-alpine
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /client ./
USER nobody
CMD ENV="prod" yarn run start
