FROM node:alpine

WORKDIR /app

RUN npm install -g nodemon

ADD package.json package-lock.json ./

RUN npm install


ADD bin ./bin
ADD src ./src




# CMD ["nodemon"]
CMD ["npm","run", "dev"]
#   used npm run dev because nodemon alone will run into a memory problem after a while and crash.
