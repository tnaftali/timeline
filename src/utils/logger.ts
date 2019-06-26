import moment from "moment";
import { FULL_DATE_FORMAT } from "../constants";

export class Logger {
    private className: string;

    constructor(className: string) {
        this.className = className;
    }

    public info(message: string): void {
        console.log(`${moment().format(FULL_DATE_FORMAT)} - ${this.className} - ${message}`);
    }

    public error(errorMessage: string, error?: object): void {
        const message = `${moment().format(FULL_DATE_FORMAT)} - ${this.className} - Error: ${errorMessage} ${error !== undefined ? " - " + error : ""}`;
        console.log(message);
    }
}
