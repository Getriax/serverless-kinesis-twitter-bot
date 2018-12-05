import Clarifai from 'clarifai';

export default class ClarifaiClient {
  constructor(client = ClarifaiClient.createClient()) {
    this.client = client;
  }

  async predict(imageUrl) {
    try {
      const { outputs } = await this.client.models.predict(Clarifai.GENERAL_MODEL, imageUrl);

      return outputs[0].data.concepts[0].name;
    } catch (error) {
      console.error(error);

      return 'bug in the code';
    }
  }

  static createClient() {
    const config = {
      apiKey: process.env.CLARIFAI_KEY,
    };

    return new Clarifai.App(config);
  }
}
