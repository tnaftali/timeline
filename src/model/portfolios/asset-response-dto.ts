import { BalanceResponseDto, IBalanceResponseDto } from "./balance-response-dto";

export interface IAssetResponseDto {
    symbol: string;
    allocation: number;
    earnings: number;
    variation: number;
    initial: IBalanceResponseDto;
    final: IBalanceResponseDto;
}

export class AssetResponseDto {
    public symbol: string;
    public allocation: number;
    public earnings: number;
    public variation: number;
    public initial: IBalanceResponseDto;
    public final: IBalanceResponseDto;

    constructor() {
        this.initial = new BalanceResponseDto();
        this.final = new BalanceResponseDto();
    }
}
