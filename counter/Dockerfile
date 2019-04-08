FROM node:lts-alpine

ENV ENVIRONMENT="prod"

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . .

RUN npm test

EXPOSE 3000
CMD ["npm", "start"]

