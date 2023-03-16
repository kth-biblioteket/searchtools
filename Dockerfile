# Use the official Node.js image as the base image
# FROM node:16.13.2 as build-stage

FROM node:16.13.2-alpine  as build-stage

# Set the working directory in the container where your app's code will be stored
WORKDIR /app

# Copy the files in your app's root directory to the working directory in the container
COPY . /app

# Install the necessary dependencies for your app using the npm package manager
RUN npm install

# Build your React app for production using the npm package manager
RUN npm run build

# Install Nginx in the container
RUN apt-get update && apt-get install -y nginx

# Replace the default Nginx configuration file with a new configuration file that serves your React app's built files
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port on which your web server will listen in the container
EXPOSE 80

# Start Nginx in the foreground and run it as the main process in the container
CMD ["nginx", "-g", "daemon off;"]