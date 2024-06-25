FROM  mongo:3.6.4

ENV NODE_ENV=development
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=admin1234

COPY ./entrypoint/mongo-init.js /docker-entrypoint-initdb.d/mongo-init.js

EXPOSE 27017


