import { API_KEY, HISTORY_ENDPOINT, WORLD_TRADING_DATA_URL } from "../constants";
import { DateUtils } from "../utils/date-utils";

export class WorldTradingDataRequestBuilder {

    private requestUrl: string;

    constructor() {
        this.requestUrl = `${WORLD_TRADING_DATA_URL}${HISTORY_ENDPOINT}?api_token=${API_KEY}`.trim();
    }

    public setSort(sort: string) {
        this.requestUrl += `&sort=${sort}`;

        return this;
    }

    public setDates(dateFrom: string, dateTo: string) {
        this.requestUrl += `&date_from=${dateFrom}&date_to=${dateTo}`;

        return this;
    }

    public setSymbol(symbol: string) {
        this.requestUrl += "&symbol=" + symbol;

        return this;
    }

    public build() {
        return this.requestUrl;
    }
}
