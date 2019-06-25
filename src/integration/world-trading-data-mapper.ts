import moment from "moment";
import { IPriceDto, PriceDto } from "../model/integration/price-dto";
import { WorldTradingDataResponseDto } from "../model/integration/world-trading-data-response-dto";

export abstract class WorldTradingDataMapper {
    public static mapResponse(response: any): WorldTradingDataResponseDto {
        const responseDto = new WorldTradingDataResponseDto();
        responseDto.name = response.name;

        const lastPriceDto: IPriceDto = new PriceDto();
        const lastPriceResponse = response.history[Object.keys(response.history)[0]];
        const date = moment(Object.keys(response.history)[0], "YYYY-MM-DD").toDate();
        date.setUTCHours(0, 0, 0, 0);
        lastPriceDto.date = date;
        lastPriceDto.close = lastPriceResponse.close;
        responseDto.lastPrice = lastPriceDto;

        return responseDto;
    }
}
