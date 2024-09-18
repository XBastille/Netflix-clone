# Base image
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy all files from the current directory to the working directory in the container
COPY . .

# Expose the port NGINX runs on
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
