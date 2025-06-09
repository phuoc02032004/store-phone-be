FROM node:16

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code, EXCLUDING .env
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the entrypoint script as the container's entrypoint
ENTRYPOINT ["entrypoint.sh"]