FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./
COPY ./gses-app ./gses-app
RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]
EXPOSE 5000