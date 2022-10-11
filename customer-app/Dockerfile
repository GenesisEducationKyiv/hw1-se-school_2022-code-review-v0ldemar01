FROM node:lts-alpine
WORKDIR /customer-app
COPY ./customer-app/package*.json ./
RUN npm ci

COPY ./customer-app tsconfig.json ./

RUN npm run build