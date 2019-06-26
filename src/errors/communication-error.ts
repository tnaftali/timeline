export class CommunicationError extends Error {
    public error_code: number;
    public error_message: string;

    constructor(error_code: number, error_message: string) {
        super();
        this.error_code = error_code;
        this.error_message = error_message;
    }
}
