FROM node:14.17-alpine

RUN mkdir -p /usr/src/app

RUN apk update &&\
    apk upgrade &&\
    apk add bash

RUN npm install -g mongoose-data-seed

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm","start"]