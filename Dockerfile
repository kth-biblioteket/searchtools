#FROM node:16.13.2 as build-stage
FROM node:16.13.2

WORKDIR /app

COPY . /app

RUN npm install

#RUN npm run build

#RUN apt-get update && apt-get install -y nginx

#COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# Specify the environment variable to determine the environment
ARG REACT_APP_ENV_FILE

# Copy the appropriate environment file
COPY $REACT_APP_ENV_FILE .env

CMD ["npm", "start"]