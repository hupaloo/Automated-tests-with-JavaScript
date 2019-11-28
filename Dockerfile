FROM node:8.16.2-alpine
RUN mkdir -p /usr/ryanair
WORKDIR /usr/ryanair
COPY . .
RUN npm i
