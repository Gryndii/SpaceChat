export class ServerError extends Error {
    constructor(message, response) {
        super(message);
        this.name = 'ServerError';
        this.message = message;
        this.response = response;
    }
}
