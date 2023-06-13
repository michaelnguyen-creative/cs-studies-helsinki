FROM node:19-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm i

CMD npm run dev