FROM node:12.19.0

# RUN npm install -g nodemon
RUN npm install -g ts-node
RUN npm install -g typescript

WORKDIR /app

COPY --chown=node:node package.json .

RUN yarn install

COPY --chown=node:node . .

CMD ["yarn", "start"]
# CMD ["sleep", "3000"]
