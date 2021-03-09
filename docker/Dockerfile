FROM node:12.19.0

# RUN npm install -g yarn
WORKDIR /app
COPY ./package.json .
RUN ls 
RUN yarn install
COPY . .
CMD ["yarn", "start"]
