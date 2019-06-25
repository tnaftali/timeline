import { IAssetResponseDto } from "./asset-response-dto";

export interface IPortfolioResponseDto {
    start_date: Date;
    end_date: Date;
    initial_balance: number;
    final_balance: number;
    assets: IAssetResponseDto[];
}

export class PortfolioResponseDto implements IPortfolioResponseDto {
    public start_date: Date;
    public end_date: Date;
    public earnings_percentage_sum: number;
    public initial_balance: number;
    public final_balance: number;
    public assets: IAssetResponseDto[];
}
