FROM node:alpine

add package.json package-lock.json ./

RUN npm install

ADD . .

CMD ["npm","start"]
