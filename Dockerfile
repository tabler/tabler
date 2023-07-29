FROM ruby:2.7-alpine

WORKDIR /app
ADD _config.yml /app/
ADD _config_prod.yml /app/
ADD Gemfile /app/
ADD Gemfile.lock /app/
ADD package.json /app/
ADD pnpm-lock.yaml /app/
ADD gulpfile.js /app/

RUN apk add --virtual build-dependencies build-base
RUN apk add npm --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community/
RUN npm i -g pnpm
RUN pnpm install
RUN bundle config --global silence_root_warning 1 && bundler install --verbose

# website
EXPOSE 3000
# website management (browser auto reload)
EXPOSE 3001
# run tabler
ENTRYPOINT [ "pnpm", "run", "start-plugins" ]
