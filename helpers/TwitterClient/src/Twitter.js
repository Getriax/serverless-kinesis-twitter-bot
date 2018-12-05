import Twitter from 'twitter';

export default class TwitterClient {
  constructor(client = TwitterClient.createClient()) {
    this.client = client;
  }

  async retweet(tweetId, text, userName) {
    const status = `@${userName} ${text}`;

    try {
      await this.client.post('statuses/update', { status, in_reply_to_status_id: tweetId });
    } catch (error) {
      console.error(error);
    }
  }

  static createClient() {
    const config = {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    };

    return new Twitter(config);
  }
}
