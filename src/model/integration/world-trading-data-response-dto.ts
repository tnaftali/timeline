import { IPriceDto } from "./price-dto";

export interface IWorldTradingDataResponseDto {
    name: string;
    history: any;
    lastPrice: IPriceDto;
}

export class WorldTradingDataResponseDto implements IWorldTradingDataResponseDto {
    public name: string;
    public history: any;
    public lastPrice: IPriceDto;
}
