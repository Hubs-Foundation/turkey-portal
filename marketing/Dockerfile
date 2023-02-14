# ---- build stage ----
FROM node:18-alpine as builder
arg GITHUB_TOKEN
workdir client
COPY . .
ENV GITHUB_TOKEN=$GITHUB_TOKEN
RUN npm install && npm run build
# ---- app stage ----
FROM node:18-alpine
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /client ./
USER nobody
CMD yarn run start
