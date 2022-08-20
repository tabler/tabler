FROM ruby:2.7-alpine

RUN apk add --no-cache nodejs npm && \
    apk add --no-cache --virtual build-dependencies build-base

WORKDIR /app

ADD package.json /app/
ADD package-lock.json /app/
ADD package.json /app/
ADD Gemfile /app/
ADD Gemfile.lock /app/
ADD _config.yml /app/
ADD gulpfile.js /app/

# RUN apk update && apk add --virtual build-dependencies build-base
RUN npm install
RUN bundle config --global silence_root_warning 1 && bundler install --verbose

# website
EXPOSE 3000

# website management (browser auto reload)
EXPOSE 3001

# run tabler
ENTRYPOINT [ "npm", "run", "start-plugins" ]