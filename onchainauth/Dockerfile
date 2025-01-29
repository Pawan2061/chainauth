FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application
COPY . .

# Expose the app on port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
