import { IAssetResponseDto } from "./asset-response-dto";

export interface IPortfolioResponseDto {
    initial_date: string;
    initial_balance: string;
    final_balance: string;
    assets: IAssetResponseDto[];
}

export class PortfolioResponseDto implements IPortfolioResponseDto {
    public initial_date: string;
    public initial_balance: string;
    public final_balance: string;
    public assets: IAssetResponseDto[];
}
