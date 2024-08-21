
FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm ci
# RUN npm install

RUN npm run test

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# FROM node:20

# WORKDIR /usr/src/app

# COPY . .

# RUN npm ci

# RUN npm run build