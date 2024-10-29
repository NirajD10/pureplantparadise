FROM node:20.18-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache python3 make g++ \
    && npm ci \
    && apk del python3 make g++

COPY . .

CMD [ "npm", "run", "prod" ]