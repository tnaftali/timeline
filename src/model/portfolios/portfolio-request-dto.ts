import { IAssetDto } from "./asset-dto";

export interface IPortfolioRequestDto {
    startDate: Date;
    initialBalance: Number;
    allocation: IAssetDto[];
}

export class PortfolioRequestDto implements IPortfolioRequestDto {
    public startDate: Date;
    public initialBalance: Number;
    public allocation: IAssetDto[];
}
