class ResponseError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}

class Response {
    constructor(status, data) {
        this.status = status
        this.data = data
    }
}
class xmlResponse {
    constructor(status, data) {
        this.status = status
        this.data = data
    }
}
module.exports = {
    ResponseError,
    Response,
    xmlResponse
}