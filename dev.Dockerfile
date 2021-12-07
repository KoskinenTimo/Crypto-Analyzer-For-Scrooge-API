FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install -g nodemon

RUN npm install -g cross-env

ENV DEBUG=playground:*

EXPOSE 3001

CMD ["nodemon", "-L", "./bin/www"]