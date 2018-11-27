FROM node:8.12.0-slim

WORKDIR /app

ARG AWS_ACCESS_KEY
ARG AWS_SECRET_ACCESS_KEY

RUN npm install -g serverless
RUN npm install -g yarn

COPY ./package.json ./yarn.lock ./
RUN yarn

RUN sls config credentials --provider aws --key $AWS_ACCESS_KEY --secret $AWS_SECRET_ACCESS_KEY

COPY . .

CMD ["sls", "offline", "start"]
