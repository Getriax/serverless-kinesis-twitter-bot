import { dynamodb } from '../utils';
import { DataPipeline } from 'aws-sdk';

export const world = async (event, context, callback) => {
  try {
    await dynamodb.put({
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: 1,
        created: Date.now(),
        field: 'hello there mate',
      },
    }).promise();
  } catch (error) {
    console.log({error});
  }

  const data = await dynamodb.get({
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: 1,
    },
  }).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, the current time is ${new Date().toTimeString()}.`,
      data,
    }),
  };

  callback(null, response);
};

export const not = (event, context, callback) => {
  const message = {
    message: 'Hello World',
    event,
  };
  // callback will send message object back
  callback(null, message);
};
