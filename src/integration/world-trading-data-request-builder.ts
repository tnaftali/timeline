import { API_KEY, HISTORY_ENDPOINT, WORLD_TRADING_DATA_URL } from "../constants";
import { DateUtils } from "../utils/date-utils";

export class WorldTradingDataRequestBuilder {

    private requestUrl: string;

    constructor() {
        const dates = DateUtils.getTenDaysPeriod();

        this.requestUrl = `${WORLD_TRADING_DATA_URL}${HISTORY_ENDPOINT}?api_token=${API_KEY}&date_from=${dates.from}&date_to=${dates.to}&sort=newest`.trim();
    }

    public setSymbol(symbol: string) {
        this.requestUrl += "&symbol=" + symbol;

        return this;
    }

    public build() {
        return this.requestUrl;
    }
}
