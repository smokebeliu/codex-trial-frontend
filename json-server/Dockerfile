# pull official base image
FROM node:13.12.0-alpine

WORKDIR /data

RUN set -xe \
    && apk add --no-cache nodejs nodejs-npm \
    && npm install -g json-server \
    && rm -rf /tmp/npm* /var/cache/apk/*

EXPOSE 3001

ENTRYPOINT ["json-server"]
CMD ["--help"]
