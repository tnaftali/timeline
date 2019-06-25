import { IPriceDto } from "./price-dto";

export interface IWorldTradingDataResponseDto {
    name: string;
    lastPrice: IPriceDto;
}

export class WorldTradingDataResponseDto implements IWorldTradingDataResponseDto {
    public name: string;
    public lastPrice: IPriceDto;
}
