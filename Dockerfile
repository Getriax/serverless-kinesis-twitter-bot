FROM node:8.10-alpine

WORKDIR /app
EXPOSE 3000

RUN npm install -g serverless
RUN npm install -g yarn

COPY ./package.json ./yarn.lock ./
RUN yarn install

COPY . .

CMD ["sls", "offline", "start"]
