# Use the official Node.js image from the Docker Hub
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
