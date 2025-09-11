FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./



COPY . . 

RUN npm install

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "start"]
