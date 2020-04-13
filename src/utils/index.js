class ResponseError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class Response {
  constructor(status, data, estimate) {
    this.status = status;
    this.data = data;
    this.estimate = estimate;
  }
}
class XMLResponse {
  constructor(status, data, estimate) {
    this.status = status;
    this.data = data;
    this.estimate = estimate;
  }
}
module.exports = {
  ResponseError,
  Response,
  XMLResponse
};
