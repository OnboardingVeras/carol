FROM node:12

WORKDIR /usr/app

COPY package*.json ./

RUN yarn

COPY . .

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT [ "./docker-entrypoint.sh" ]

CMD ["yarn", "start"]

