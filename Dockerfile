FROM node:16.13.2 as build-stage
#FROM node:16.13.2

# Specify the environment variable to determine the environment
ARG REACT_APP_ENV_FILE

# Copy the appropriate environment file
COPY $REACT_APP_ENV_FILE .env

# Echo the value of the environment variable to the container's output
RUN echo "REACT_APP_ENV_FILE value is: $REACT_APP_ENV_FILE"

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

RUN apt-get update && apt-get install -y nginx

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#CMD ["npm", "start"]