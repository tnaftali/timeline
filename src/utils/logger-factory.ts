import { Logger } from "./logger";

export abstract class LoggerFactory {
    public static create(className: string): Logger {
        return new Logger(className);
    }
}
