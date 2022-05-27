export class APIError extends Error {
    status: number;

    constructor(status: number, message: string | undefined) {
        super(message);

        this.name = "APIError";
        this.status = status;
    }
}

export class NotFoundError extends APIError {
    constructor(message: string | undefined) {
        super(404, message);

        this.name = "NotFoundError";
    }
}

export class UnauthorizedError extends APIError {
    constructor(message: string | undefined) {
        super(401, message);

        this.name = "UnauthorizedError";
    }
}
