FROM node:14.17-alpine

RUN mkdir -p /usr/src/app

RUN apk update &&\
    apk upgrade &&\
    apk add bash

RUN npm install -g nodemon mongoose-data-seed

WORKDIR /usr/src/app

COPY package-lock.json .
COPY package.json .

RUN npm install

COPY . .

CMD ["npm","start"]