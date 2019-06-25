import moment from "moment";
import { IPriceDto } from "../model/integration/price-dto";
import { WorldTradingDataResponseDto } from "../model/integration/world-trading-data-response-dto";

export abstract class WorldTradingDataMapper {
    public static mapResponse(response: any): WorldTradingDataResponseDto {
        const responseDto = new WorldTradingDataResponseDto();
        responseDto.name = response.name;
        const lastPrice: IPriceDto = response.history[Object.keys(response.history)[0]];
        const date = moment(Object.keys(response.history)[0], "YYYY-MM-DD").toDate();
        date.setUTCHours(0, 0, 0, 0);
        lastPrice.date = date;
        responseDto.lastPrice = lastPrice;

        return responseDto;
    }
}
