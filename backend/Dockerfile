# Gunakan image resmi Node
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Copy seluruh source code
COPY . .

# Build TypeScript ke JavaScript (ke folder dist/)
RUN npm run build

# Jalankan app dari file hasil build
CMD ["node", "dist/index.js"]
