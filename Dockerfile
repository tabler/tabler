FROM node:22-alpine

WORKDIR /app

# pnpm via corepack, pinned by the "packageManager" field in package.json
RUN corepack enable

COPY . .

RUN pnpm install --frozen-lockfile

# preview website
EXPOSE 3000
# documentation website
EXPOSE 3010

# run tabler dev servers
ENTRYPOINT [ "pnpm", "run", "start" ]
