FROM node:11.5.0-alpine

WORKDIR /usr/src/app
ADD package.json /tmp/package.json
RUN cd /tmp && npm install -qy
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

CMD ["npm", "start"]