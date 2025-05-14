# Etapa 1: Construir la aplicación Angular
FROM node:16 AS build

WORKDIR /usr/src/app

# Copiar los archivos de configuración de npm
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación Angular
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

COPY dist/user-management-system /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]