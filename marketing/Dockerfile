# ---- build stage ----
FROM node:18-alpine as builder
arg GITHUB_TOKEN
workdir marketing
COPY . .
ENV GITHUB_TOKEN=$GITHUB_TOKEN
RUN npm config set -- "//npm.pkg.github.com/:_authToken" "$GITHUB_TOKEN" && npm install --legacy-peer-deps  && npm run build
# ---- app stage ----
FROM node:18-alpine
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /marketing ./
USER nobody
CMD yarn run start
