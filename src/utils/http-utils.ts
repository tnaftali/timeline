import request from "request";
import { Logger } from "./logger";

export abstract class HttpUtils {
    public static doGet(url: string): Promise<string> {
        Logger.info(`Executing GET request to ${url}`, HttpUtils.name);

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
}
