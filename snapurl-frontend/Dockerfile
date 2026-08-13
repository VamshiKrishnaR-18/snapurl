# Use an official Node runtime
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the Vite development server and expose it to the network
CMD ["npm", "run", "dev", "--", "--host"]