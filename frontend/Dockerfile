FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

COPY . .

# Configurar soporte para OpenSSL heredado
ENV NODE_OPTIONS=--openssl-legacy-provider

# Construir la aplicación Angular
RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]