import { res } from '../utils';

export const world = async (event, context, callback) => {

  res(callback).status(401).json({ hello: 'Hello there mate' });
};

export const not = (event, context, callback) => {
  const message = {
    message: 'Hello World',
    event,
  };
  // callback will send message object back
  callback(null, message);
};
