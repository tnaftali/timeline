import request from "request";
import { Logger } from "./logger";
import { LoggerFactory } from "./logger-factory";

export abstract class HttpUtils {
    public static doGet(url: string): Promise<string> {
        this.logger.info(`Executing GET request to ${url}`);

        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                if (response.statusCode !== 200) {
                    reject(`Invalid status code <${response.statusCode}>`);
                }
                resolve(body);
            });
        });
    }

    private static readonly logger: Logger = LoggerFactory.create(HttpUtils.name);
}
