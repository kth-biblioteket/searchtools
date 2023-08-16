FROM node:16.13.2 as build-stage
#FROM node:16.13.2

# Specify the environment variable to determine the environment
ARG REACT_APP_ENV_FILE=.env.main

# Set environment variable using the build argument
ENV REACT_APP_ENV $REACT_APP_ENV_FILE

# Print the build argument value
RUN echo "Build argument value: $REACT_APP_ENV"

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

RUN apt-get update && apt-get install -y nginx

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#CMD ["npm", "start"]