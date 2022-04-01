# ---- build stage ----
FROM elixir:1.13 as builder
RUN apt-get update -y && apt-get install -y build-essential git \
    && apt-get clean && rm -f /var/lib/apt/lists/*_*
RUN mix local.rebar --force \ 
    && mix local.hex --force
ENV MIX_ENV=prod
COPY mix.exs mix.lock ./    
RUN mix deps.get --only $MIX_ENV
RUN mkdir config
COPY config/config.exs config/${MIX_ENV}.exs config/
RUN mix deps.compile
COPY priv priv
COPY assets assets
# RUN mix assets.deploy
RUN mix phx.digest
COPY lib ./lib
RUN mix compile
COPY config/runtime.exs config/
# COPY rel rel
RUN mix release

# ---- app stage ----
from debian:bullseye-slim
RUN apt-get update -y && apt-get install -y libstdc++6 openssl libncurses5 locales \
  && apt-get clean && rm -f /var/lib/apt/lists/*_*
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /_build/prod/rel/prtl ./
USER nobody
CMD /app/bin/prtl start
