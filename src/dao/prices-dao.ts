import Prices = require("../model/prices/prices");
import { IPricesModel } from "../model/prices/prices-model";
import { Logger } from "../utils/logger";

export abstract class PricesDao {
    public static save(price: IPricesModel) {
        Logger.info(this.SAVING_PRICES, PricesDao.name);
        price.save((error: any) => {
            if (error) {
                Logger.error(
                    `There was a problem saving price: ${error}`,
                    error
                );
            } else {
                Logger.info(
                    `Daily prices saved successfully: ${JSON.stringify(price)}`,
                    PricesDao.name
                );
            }
        });
    }

    public static getPricesByDateRange(from: Date, to: Date): Promise<IPricesModel[]> {
        Logger.info(this.SEARCHING_PRICES_BY_DATE_RANGE, PricesDao.name);

        from.setHours(23, 59, 0);
        to.setHours(23, 59, 0);

        return new Promise((resolve, reject) => {
            Prices.find(
                {
                    date: {
                        $gte: from,
                        $lt: to,
                    },
                },
                {
                    _id: 0,
                    date: 1,
                    smrCvUsd: 1,
                    smrLUsd: 1,
                    smr5Usd: 1,
                    smr10Usd: 1,
                    smr20Usd: 1,
                    latexUsd: 1,
                    smrCvSen: 1,
                    smrLSen: 1,
                    smr5Sen: 1,
                    smr10Sen: 1,
                    smr20Sen: 1,
                    latexSen: 1,
                },
                (error: any, pricesByRange: IPricesModel[]) => {
                    if (error) {
                        Logger.error(
                            `There was a problem getting prices from database: ${error}`,
                            error
                        );
                        reject(error);
                    }
                    resolve(pricesByRange);
                }
            ).sort({ date: 1 });
        });
    }

    public static getLastPricesObject(count: number): Promise<IPricesModel[]> {
        Logger.info(this.GETTING_LAST_PRICES, PricesDao.name);

        return new Promise((resolve, reject) => {
            Prices.find((error: any, obj: any) => {
                if (error) {
                    Logger.error(
                        `There was a problem getting price from database: ${error}`,
                        error
                    );
                    reject(error);
                }
                resolve(obj);
            })
                .limit(count)
                .sort({ date: -1 });
        });
    }

    private static readonly SAVING_PRICES = "Saving prices in database";
    private static readonly GETTING_LAST_PRICES =
        "Getting last prices from database";
    private static readonly SEARCHING_PRICES_BY_DATE_RANGE =
        "Searching prices by date range";
}
