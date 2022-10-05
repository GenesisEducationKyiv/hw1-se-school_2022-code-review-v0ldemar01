FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./
RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]
EXPOSE 5000