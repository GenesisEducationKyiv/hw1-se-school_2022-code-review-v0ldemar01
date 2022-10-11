FROM node:lts-alpine
WORKDIR /gses-app
COPY ./gses-app/package*.json ./
RUN npm ci

COPY ./gses-app tsconfig.json ./

RUN npm run build