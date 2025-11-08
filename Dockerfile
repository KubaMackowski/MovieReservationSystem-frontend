# Użyj bazowego obrazu Node.js (wersja jak w produkcji)
FROM node:20-alpine

# Ustaw katalog roboczy wewnątrz kontenera
WORKDIR /app

# Skopiuj tylko pliki potrzebne do instalacji zależności
COPY package.json package-lock.json ./

# Zainstaluj zależności
RUN npm install

# Wystaw port dla serwera deweloperskiego Next.js
EXPOSE 3000

# Komenda, która domyślnie uruchomi serwer deweloperski
CMD ["npm", "run", "dev"]