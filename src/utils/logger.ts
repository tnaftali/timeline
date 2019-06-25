export class Logger {
    private className: string;

    constructor(className: string) {
        this.className = className;
    }

    public info(message: string): void {
        console.log(`${Date().toLocaleString()} - ${this.className} - ${message}`);
    }

    public error(errorMessage: string, error?: object): void {
        const message = `${Date().toLocaleString()} - ${this.className} - Error: ${errorMessage} ${error !== undefined ? " - " + error : ""}`;
        console.log(message);
    }
}
