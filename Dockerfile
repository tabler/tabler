FROM ubuntu:20.04

# check https://github.com/nodesource/distributions for setup_XX versions
ARG NODE_SETUP=setup_14
ARG RUBY_VERSION=2.7

# RUBY installation
RUN apt-get update \
    && apt-get -y install curl gcc g++ make software-properties-common \
    && apt-add-repository ppa:brightbox/ruby-ng && apt-get update \
    && apt-get -y --no-install-recommends install ruby$RUBY_VERSION ruby$RUBY_VERSION-dev ruby-switch \
    && rm -rf /var/lib/apt/lists/*


RUN ruby-switch --set ruby$RUBY_VERSION && gem$RUBY_VERSION install bundler

# NODEJS installation
RUN curl -sL https://deb.nodesource.com/$NODE_SETUP.x | bash -
RUN apt-get update && apt-get -y --no-install-recommends install nodejs && npm install -g npm@latest && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# install app in image
ADD package.json /app/
ADD package-lock.json /app/
ADD package.json /app/
ADD Gemfile /app/
ADD Gemfile.lock /app/
ADD _config.yml /app/
ADD gulpfile.js /app/

RUN npm install
RUN bundle config --global silence_root_warning 1 && bundler install --verbose

# website
EXPOSE 3000

# website management (browser auto reload)
EXPOSE 3001

# run tabler
ENTRYPOINT [ "npm", "run", "start-plugins" ]