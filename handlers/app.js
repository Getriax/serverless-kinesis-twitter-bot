import { Twitter, Clarifai } from '../helpers';

export const isVovel = text => ['a', 'e', 'i', 'o', 'u'].some(letter => letter === text[0].toLowerCase());

export const predictAndRetweet = async (tweetId, imageUrl, userName) => {
  const twitter = new Twitter();
  const clarifai = new Clarifai();

  const objectName = await clarifai.predict(imageUrl);

  const text = `In this picture I can see ${isVovel(objectName) ? 'an' : 'a'} ${objectName}!`;

  await twitter.retweet(tweetId, text, userName);
};

export const reply = async (event, context, callback) => {
  const records = event.Records || [];

  const tweetes = records
    .map(record => Buffer.from(record.kinesis.data, 'base64').toString())
    .map(recordData => JSON.parse(recordData).data);

  const predictionPromises = tweetes.map(
    ({ id, imageUrl, user }) => predictAndRetweet(id, imageUrl, user),
  );

  try {
    await Promise.all(predictionPromises);
  } catch (error) {
    return callback(error, { done: true });
  }

  return callback(null, { done: true });
};
