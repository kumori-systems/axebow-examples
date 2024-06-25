### STEP 1: WEBAPP ###

#We label our stage as 'compile-image'
FROM node:12-alpine3.14  as compile-image

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build -- --prod


### STEP 2: NGINX ###

FROM nginx:1.21-alpine

ENV BASE_URL="http://127.0.0.1:3000/api"

RUN apk update
RUN apk upgrade
RUN apk add bash

## Copy our nginx config
COPY nginx.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'compile-image' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=compile-image /ng-app/dist/webapp-employee-and-department /usr/share/nginx/html

COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 3000

CMD ["/entrypoint.sh"]

#
#CMD ["nginx", "-g", "daemon off;"]
