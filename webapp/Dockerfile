FROM node:14-alpine
ADD . /webapp
WORKDIR /webapp
RUN npm install && npm run build
RUN npm install -g serve
CMD [ "serve", "-l", "5000", "-s", "build" ]
