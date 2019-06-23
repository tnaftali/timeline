export class Logger {
    public static info(message: string, className: string): void {
        // tslint:disable-next-line:no-console
        console.log(`${Date().toLocaleString()} - ${className} - ${message}`);
    }

    public static error(errorMessage: string, error?: object): void {
        const message = `${Date().toLocaleString()} - Error: ${errorMessage}
        ${error !== undefined ? " - " + error : ""}`;
        // tslint:disable-next-line:no-console
        console.log(message);
    }
}
