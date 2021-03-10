FROM node:12.19.0

# RUN npm install -g yarn
# RUN npm install typescript -g 
WORKDIR /src
COPY package.json .
RUN yarn install
COPY . .
RUN npm install -g nodemon
RUN npm install -g ts-node
RUN npm install -g typescript

CMD ["yarn", "start"]
# CMD ["sleep", "3000"]
