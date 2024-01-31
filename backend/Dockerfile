FROM node:alpine

WORKDIR /app

RUN npm install -g nodemon

ADD package.json package-lock.json ./

RUN npm install


ADD bin ./bin
ADD src ./src



# @Digdem: Please use npm run dev because nodemon alone will run into a memory problem after a while and crash.
CMD ["npm","run","dev"]
