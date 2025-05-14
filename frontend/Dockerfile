# Etapa 1: Construir la aplicación Angular
FROM node:20 AS build

WORKDIR /usr/src/app

# Copiar los archivos de configuración de npm
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiar el resto de los archivos del proyecto
COPY . .

# Configurar soporte para OpenSSL heredado
ENV NODE_OPTIONS=--openssl-legacy-provider

# Construir la aplicación Angular
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

COPY dist/user-management-system /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]