
class ResponseBuilder {
  constructor(callback) {
    this.callback = callback;
    this.statusCode = 200;
    this.params = {};
  }

  send(message) {
    Object.assign(this.params, { message });
    this.end();
  }

  json(params) {
    Object.assign(this.params, { ...params });
    this.end();
  }

  status(status) {
    this.statusCode = status;
    return this;
  }

  buildResponse() {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        ...this.params,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  }

  end() {
    const response = this.buildResponse();
    return this.callback(null, response);
  }
}

export default function (callback) { return new ResponseBuilder(callback); }
