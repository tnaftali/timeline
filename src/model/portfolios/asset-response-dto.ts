import { BalanceResponseDto, IBalanceResponseDto } from "./balance-response-dto";

export interface IAssetResponseDto {
    symbol: string;
    allocation: string;
    earnings: string;
    variation: string;
    initial: IBalanceResponseDto;
    final: IBalanceResponseDto;
}

export class AssetResponseDto {
    public symbol: string;
    public allocation: string;
    public earnings: string;
    public variation: string;
    public initial: IBalanceResponseDto;
    public final: IBalanceResponseDto;

    constructor() {
        this.initial = new BalanceResponseDto();
        this.final = new BalanceResponseDto();
    }
}
