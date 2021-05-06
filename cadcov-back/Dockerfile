FROM node:10
LABEL maintainer="celiomarcos@gmail.com"
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app/cadcov-back && cp -a /tmp/node_modules /opt/app/cadcov-back/
WORKDIR /opt/app/cadcov-back
ADD . /opt/app/cadcov-back
EXPOSE 8080
CMD ["node", "server.js"]
