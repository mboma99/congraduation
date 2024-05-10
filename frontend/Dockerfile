# Use the official Node.js image as a base
FROM node:21-bullseye-slim

# Copy package.json, package-lock.json, and npm-shrinkwrap.json into the container
COPY package*.json ./
COPY npm-shrinkwrap.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Command to run the application
CMD ["npm", "start"]
