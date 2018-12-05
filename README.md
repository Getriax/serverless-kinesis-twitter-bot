# serverless-kinesis-twitter-bot
Reacts on a kinesis writes from [this repo](https://github.com/Getriax/kinesis-twitter-listener)
## Docker

Docker has it own environment variables available in env.docker.exmaple

**run:**

    $ cp env.docker.exmaplel .env.docker

## Environment

All required environment variables are in the env.example.yml

**run:**

    $ cp env.example.yml .env.yml

And fill all the required fileds with proper values


## To RUN

    $ docker-compose build
    $ docker-compose up
