import promise from "bluebird";
import { MESSAGES, Sort } from "../constants";
import { WorldTradingDataMapper } from "../mappers/world-trading-data-mapper";
import { IWorldTradingDataResponseDto } from "../models/dto/world-trading-data-response-dto";
import { DateUtils } from "../utils/date-utils";
import { Logger } from "../utils/logger";
import { LoggerFactory } from "../utils/logger-factory";
import { WorldTradingDataRequestBuilder } from "../utils/world-trading-data-request-builder";

export class WorldTradingDataIntegrationService {
    private readonly logger: Logger = LoggerFactory.create(WorldTradingDataIntegrationService.name);

    private readonly worldTradingDataMapper: WorldTradingDataMapper;

    constructor(worldTradingDataMapper: WorldTradingDataMapper) {
        this.worldTradingDataMapper = worldTradingDataMapper;
    }

    public async getSymbolsActualValue(startDate: Date, symbols: string[]): Promise<IWorldTradingDataResponseDto[]> {
        this.logger.info(MESSAGES.BUILDING_REQUESTS);
        const request = promise.promisifyAll(require("request"), { multiArgs: true });
        const urlList: string[] = [];

        symbols.forEach((symbol) => {
            const pastDates = DateUtils.sumDays(startDate);
            urlList.push(new WorldTradingDataRequestBuilder()
                .setDates(pastDates.from, pastDates.to)
                .setSymbol(symbol)
                .setSort(Sort.OLDEST)
                .build());

            const actualDates = DateUtils.getTenDaysPeriod();
            urlList.push(new WorldTradingDataRequestBuilder()
                .setDates(actualDates.from, actualDates.to)
                .setSymbol(symbol)
                .setSort(Sort.NEWEST)
                .build());
        });

        return promise.map(urlList,
            (url) => {
                this.logger.info(`Executing GET request: ${url}`);
                return request.getAsync(url).spread((response: any, body: any) => this.worldTradingDataMapper.mapResponseToDto(JSON.parse(body)));
            }
        ).then((results: IWorldTradingDataResponseDto[]) => {
            return results;
        }).catch((err) => {
            this.logger.error(err);
            throw new Error(MESSAGES.ERROR_GETTING_VALUES);
        });
    }
}
