import promise from "bluebird";
import { IWorldTradingDataResponseDto, WorldTradingDataResponseDto } from "../model/integration/world-trading-data-response-dto";
import { DateUtils } from "../utils/date-utils";
import { HttpUtils } from "../utils/http-utils";
import { Logger } from "../utils/logger";
import { LoggerFactory } from "../utils/logger-factory";
import { WorldTradingDataMapper } from "./world-trading-data-mapper";
import { WorldTradingDataRequestBuilder } from "./world-trading-data-request-builder";

export class WorldTradingDataIntegrationService {
    private readonly logger: Logger = LoggerFactory.create(WorldTradingDataIntegrationService.name);

    private readonly BUILDING_REQUESTS = "Building requests for WorldTradingData API";

    public async getSymbolsActualValue(startDate: Date, symbols: string[]): Promise<WorldTradingDataResponseDto[]> {
        this.logger.info(this.BUILDING_REQUESTS);
        const request = promise.promisifyAll(require("request"), { multiArgs: true });
        const urlList: string[] = [];

        symbols.forEach((symbol) => {
            const pastDates = DateUtils.sumDays(startDate);
            urlList.push(new WorldTradingDataRequestBuilder().setDates(pastDates.from, pastDates.to).setSymbol(symbol).setSort("oldest").build());

            const actualDates = DateUtils.getTenDaysPeriod();
            urlList.push(new WorldTradingDataRequestBuilder().setDates(actualDates.from, actualDates.to).setSymbol(symbol).setSort("newest").build());
        });

        // console.log(urlList);

        return promise.map(urlList,
            (url) => {
                this.logger.info(`Executing GET request: ${url}`);
                return request.getAsync(url).spread((response: any, body: any) => WorldTradingDataMapper.mapResponse(JSON.parse(body)));
            }
        ).then((results: WorldTradingDataResponseDto[]) => {
            return results;
        }).catch((err) => {
            this.logger.error(err);
            throw err;
        });
    }
}
