import { PricesDao } from "../dao/prices-dao";
import { IPricesModel } from "../model/prices/prices-model";

export class PricesValidator {
    private readonly PRICES_ALREADY_STORED = "Prices already stored in database";

    public async validateLastPrices(actualPrices: IPricesModel): Promise<any> {
        const lastPrices: any = await PricesDao.getLastPricesObject(1);

        return new Promise((resolve, reject) => {
            if (lastPrices[0].date.getTime() === actualPrices.date.getTime()) {
                reject(this.PRICES_ALREADY_STORED);
            }
            resolve();
        });
    }
}
