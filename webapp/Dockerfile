FROM node:14-alpine
ADD . /webapp
WORKDIR /webapp
RUN npm install && npm run build
CMD [ "npm", "start" ]
