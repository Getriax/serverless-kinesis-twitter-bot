import faker from 'faker';

export const recordDataBuffered = ({
  id = faker.random.uuid(),
  imageUrl = faker.internet.avatar(),
  user = faker.internet.userName(),
  timestamp = Date.now(),
} = {}) => Buffer.from(
  JSON.stringify({
    timestamp,
    data: {
      id, imageUrl, user,
    },
  }),
  'utf-8',
);

export const eventFactory = ({
  records = [{
    kinesis: {
      data: recordDataBuffered(),
    },
  }],
} = {}) => ({ Records: records });
