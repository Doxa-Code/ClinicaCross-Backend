FROM node:latest
WORKDIR /usr/app

COPY build .
COPY package.json .

RUN yarn install

EXPOSE 3333

CMD ["node", "index.js"]
