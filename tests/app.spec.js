import sinon from 'sinon';

import * as handler from '../handlers/app';
import { Twitter, Clarifai } from '../helpers';
import * as factories from './factories';

const clarifaiClient = {
  models: {
    predict: () => Promise.resolve(),
  },
};

const twitterClient = {
  post: () => Promise.resolve(),
};

describe('Twitter reply handler test suite', () => {
  beforeEach(() => {
    sinon.stub(Twitter, 'createClient').returns(twitterClient);
    sinon.stub(Clarifai, 'createClient').returns(clarifaiClient);
  });

  afterEach(() => {
    sinon.restore();
  });

  const tick = ms => new Promise(resolve => setTimeout(resolve, ms));

  test('Should reply with image object name and callback with not a vovel', async () => {
    const predictData = factories.predictFactory({ name: 'cat' });

    const predictStub = sinon.stub(clarifaiClient.models, 'predict').resolves(predictData);
    const postSpy = sinon.spy(twitterClient, 'post');
    const callbackSpy = sinon.spy();

    const evnetData = factories.eventFactory();
    const parsedData = JSON.parse(Buffer.from(evnetData.Records[0].kinesis.data, 'base64').toString());

    handler.reply(evnetData, '', callbackSpy);

    expect(predictStub.firstCall.args[1]).toEqual(parsedData.data.imageUrl);
    await expect(predictStub.firstCall.returnValue).resolves.toEqual(predictData);

    const expectedStatus = `@${parsedData.data.user} In this picture I can see a cat!`;
    const tweetId = parsedData.data.id;

    await tick(1);

    expect(postSpy.firstCall.args[1]).toEqual(
      { status: expectedStatus, in_reply_to_status_id: tweetId },
    );

    expect(callbackSpy.firstCall.args).toEqual([null, { done: true }]);
  });

  test('Should reply with image object name and callback with vovel', async () => {
    const predictData = factories.predictFactory({ name: 'acat' });

    const predictStub = sinon.stub(clarifaiClient.models, 'predict').resolves(predictData);
    const postSpy = sinon.spy(twitterClient, 'post');
    const callbackSpy = sinon.spy();

    const evnetData = factories.eventFactory();
    const parsedData = JSON.parse(Buffer.from(evnetData.Records[0].kinesis.data, 'base64').toString());

    handler.reply(evnetData, '', callbackSpy);

    expect(predictStub.firstCall.args[1]).toEqual(parsedData.data.imageUrl);
    await expect(predictStub.firstCall.returnValue).resolves.toEqual(predictData);

    const expectedStatus = `@${parsedData.data.user} In this picture I can see an acat!`;
    const tweetId = parsedData.data.id;

    await tick(1);

    expect(postSpy.firstCall.args[1]).toEqual(
      { status: expectedStatus, in_reply_to_status_id: tweetId },
    );

    expect(callbackSpy.firstCall.args).toEqual([null, { done: true }]);
  });

  test('Should log any error', async () => {
    sinon.stub(clarifaiClient.models, 'predict').rejects();
    sinon.stub(twitterClient, 'post').rejects();

    const callbackSpy = sinon.spy();
    const logStub = sinon.stub(console, 'error').returns();

    const evnetData = factories.eventFactory();

    handler.reply(evnetData, '', callbackSpy);

    await tick(1);


    expect(logStub.calledTwice).toBe(true);
  });
});
