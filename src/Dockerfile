FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
RUN npm run build
 
FROM nginx:stable-alpine as production-stage
COPY --from=build /usr/src/app/docs/.vuepress/dist /usr/share/nginx/html/