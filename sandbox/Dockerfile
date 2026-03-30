FROM node:18-alpine

WORKDIR /app

# Install basic tools
RUN apk add --no-cache bash

# Copy package files if present
COPY package*.json ./

# Install deps if package.json exists
RUN if [ -f package.json ]; then npm install; fi

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]