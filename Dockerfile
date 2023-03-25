FROM node:16.13.2 as build-stage

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

RUN apt-get update && apt-get install -y nginx

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]