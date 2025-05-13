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

# Copiar los archivos construidos al directorio de Nginx
COPY --from=build /usr/src/app/dist/user-management-system /usr/share/nginx/html

# Exponer el puerto 80 para servir la aplicación
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]