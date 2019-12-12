FROM node:10.17-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN apk update && apk upgrade && apk add bash

RUN npm install

EXPOSE 3010