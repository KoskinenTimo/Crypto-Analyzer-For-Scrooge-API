FROM node:16-alpine AS build-stage

WORKDIR /usr/src/app

COPY . .

ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

ARG SECRET
ENV SECRET=$SECRET

ARG PORT
ENV PORT=$PORT

RUN npm ci

RUN npm install -g cross-env

CMD npm start