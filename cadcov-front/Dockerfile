FROM node:10
LABEL maintainer="celiomarcos@gmail.com"
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app/cadcov-front && cp -a /tmp/node_modules /opt/app/cadcov-front/
WORKDIR /opt/app/cadcov-front
ADD . /opt/app/cadcov-front
EXPOSE 8081
CMD ["npm", "run", "serve"]
