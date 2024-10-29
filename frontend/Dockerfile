FROM node:20.18-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "dev" "--", "--host" ]