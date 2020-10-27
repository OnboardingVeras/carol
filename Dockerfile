FROM node:12

WORKDIR /usr/app

COPY package*.json ./

RUN yarn

COPY . .

ENTRYPOINT [ "./docker-entrypoint.sh" ]

CMD ["yarn", "start"]

