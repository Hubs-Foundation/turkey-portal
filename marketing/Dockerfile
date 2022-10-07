# ---- build stage ----
FROM node:18-alpine as builder
arg GITHUB_TOKEN
workdir client
COPY . .
COPY .env.production ./.env.production
run ls . -lha
ENV GITHUB_TOKEN=$GITHUB_TOKEN
RUN npm config set -- "//npm.pkg.github.com/:_authToken" "$GITHUB_TOKEN" && npm install --legacy-peer-deps  && npm run build
# ---- app stage ----
FROM node:18-alpine
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /client ./
USER nobody
run ls . -lha
CMD source .env.production && yarn run start
