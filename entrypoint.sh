#!/bin/sh

# Run the seed script to create admin user
echo "Running database seed..."
node seed.js

# Start the application
echo "Starting the application..."
npm start
