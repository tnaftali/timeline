import { PricesDao } from "../dao/prices-dao";
import { PricesMapper } from "../mappers/prices-mapper";
import { IPricesModel } from "../model/prices/prices-model";
import { HttpUtils } from "../utils/http-utils";
import { Logger } from "../utils/logger";

export class PricesService {
    private readonly url = "http://www3.lgm.gov.my/mre/daily.aspx";
    private readonly GETTING_PRICES = "Getting updated prices from source";

    public async getPricesFromSource(): Promise<IPricesModel> {
        Logger.info(this.GETTING_PRICES, PricesService.name);

        const response = await HttpUtils.doGet(this.url);

        return PricesMapper.mapResponseToPrices(response);
    }

    public async getPricesByDateRange(from: Date, to: Date): Promise<IPricesModel[]> {
        return await PricesDao.getPricesByDateRange(from, to);
    }
}
