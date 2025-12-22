FROM node:18

WORKDIR /app

RUN npm install -g pnpm

COPY package.json  ./

COPY . . 

RUN pnpm install
RUN pnpm run build
EXPOSE 5173
CMD ["pnpm", "run", "start"]
