# ---- build stage ----
FROM node:18-alpine as builder
arg GITHUB_TOKEN
workdir client
COPY . .
ENV GITHUB_TOKEN=$GITHUB_TOKEN
RUN npm config set -- "//npm.pkg.github.com/:_authToken" "$GITHUB_TOKEN" && npm install --legacy-peer-deps  && npm run build
# ---- app stage ----
FROM node:18-alpine
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /client ./
USER nobody
CMD source env.production && echo "FXA_SERVER=$FXA_SERVER"; yarn run start
