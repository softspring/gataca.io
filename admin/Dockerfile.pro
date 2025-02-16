FROM node:18-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g && yarn install
WORKDIR /opt/app
COPY ./ .

RUN yarn build
EXPOSE 1337

RUN adduser -u 2000 -D --gecos "" -S strapi
RUN chown -R 2000 /opt/app
USER strapi
CMD ["yarn", "start"]
