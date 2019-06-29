import { IAssetDto } from "./asset-dto";

export interface IPortfolioRequestDto {
    start_date: Date;
    initial_balance: number;
    allocation: IAssetDto[];
}

export class PortfolioRequestDto implements IPortfolioRequestDto {
    start_date: Date;
    initial_balance: number;
    allocation: IAssetDto[];
}
