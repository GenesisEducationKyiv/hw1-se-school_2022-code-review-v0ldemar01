FROM node:lts-alpine
WORKDIR /logger-app
COPY ./logger-app/package*.json ./
RUN npm ci

COPY ./logger-app tsconfig.json ./

RUN npm run build