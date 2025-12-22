FROM node:18-alpine


WORKDIR /app


COPY package.json  ./
COPY pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . . 

RUN pnpm install
RUN pnpm run build
EXPOSE 5173
CMD ["pnpm", "run", "start"]
