FROM ruby:3.2-alpine

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json README.md LICENSE ./

COPY core/ core/
COPY preview/ preview/
COPY docs/ docs/
COPY shared/ shared/

RUN apk add --virtual build-dependencies build-base npm
RUN apk upgrade
RUN npm i -g pnpm
RUN pnpm install

# website
EXPOSE 3000
# website management (browser auto reload)
EXPOSE 3010
# run tabler
ENTRYPOINT [ "pnpm", "run", "start" ]
