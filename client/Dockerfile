# ---- build stage ----
FROM node:18-alpine as builder
workdir client
COPY . .
RUN yarn && yarn run build
# ---- app stage ----
FROM node:18-alpine
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /client ./
USER nobody
CMD yarn run start
