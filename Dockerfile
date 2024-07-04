# Stage 1: Build the Angular app
FROM node:18.13 as build

WORKDIR /app


COPY package.json package-lock.json ./
RUN npm install --force

RUN npm install -g @angular/cli
COPY . .
RUN npm run build --prod

EXPOSE 4200


CMD ["ng", "serve", "--host", "0.0.0.0"]