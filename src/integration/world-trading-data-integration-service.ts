import promise from "bluebird";
import { IWorldTradingDataResponseDto, WorldTradingDataResponseDto } from "../model/integration/world-trading-data-response-dto";
import { HttpUtils } from "../utils/http-utils";
import { WorldTradingDataMapper } from "./world-trading-data-mapper";
import { WorldTradingDataRequestBuilder } from "./world-trading-data-request-builder";

export class WorldTradingDataIntegrationService {

    public async getSymbolsActualValue(symbols: string[]) {
        const request = promise.promisifyAll(require("request"), { multiArgs: true });
        const urlList = symbols.map((symbol) => new WorldTradingDataRequestBuilder().setSymbol(symbol).build());

        return promise.map(urlList,
            (url) => request.getAsync(url).spread(
                (response: any, body: any) => WorldTradingDataMapper.mapResponse(JSON.parse(body)))
        ).then((results: WorldTradingDataResponseDto[]) => {
            return results;
        }).catch((err) => {
            console.log(err);
        });
    }
}
