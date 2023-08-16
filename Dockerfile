FROM node:16.13.2 as build-stage

ARG REACT_APP_ENV_FILE=.env.main

ENV REACT_APP_ENV $REACT_APP_ENV_FILE

WORKDIR /app

COPY . /app

COPY $REACT_APP_ENV .env

RUN npm install

RUN npm run build

RUN apt-get update && apt-get install -y nginx

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#CMD ["npm", "start"]