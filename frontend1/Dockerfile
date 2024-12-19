# Gunakan image Node.js versi 20
FROM node:20

# Set working directory
WORKDIR /app

# Copy file package.json dan package-lock.json untuk install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code ke dalam container
COPY . .

# Tentukan port yang digunakan aplikasi (default React di 3000)
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
