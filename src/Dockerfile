FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN --mount=type=secret,mode=0644,id=npmrc,target=/usr/src/app/.npmrc npm ci --only=production
RUN npm run build
 
FROM nginx:stable-alpine as production-stage
COPY --from=build /usr/src/app/docs/.vuepress/dist /usr/share/nginx/html/