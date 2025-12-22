FROM node:18-alpine


WORKDIR /app


COPY package.json  ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm

COPY . . 

RUN pnpm install
RUN pnpm run build
EXPOSE 5173
CMD ["pnpm", "run", "start"]
