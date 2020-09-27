export class ConnectionError<TResponse> extends Error {
    constructor(response: TResponse, message?: string) {
        super(message);
        Object.setPrototypeOf(this, ConnectionError.prototype);
    }
}