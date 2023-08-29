FROM node:16-alpine3.18

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]