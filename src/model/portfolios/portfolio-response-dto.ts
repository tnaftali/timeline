import { IAssetResponseDto } from "./asset-response-dto";

export interface IPortfolioResponseDto {
    initial_date: string;
    initial_balance: number;
    final_balance: number;
    assets: IAssetResponseDto[];
}

export class PortfolioResponseDto implements IPortfolioResponseDto {
    public initial_date: string;
    public initial_balance: number;
    public final_balance: number;
    public assets: IAssetResponseDto[];
}
