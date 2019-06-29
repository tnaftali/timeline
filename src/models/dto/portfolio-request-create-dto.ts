import { IAssetCreateDto } from "./asset-create-dto";

export interface IPortfolioRequestCreateDto {
    name: string;
    start_date: string;
    initial_balance: number;
    user_id: number;
    assets: IAssetCreateDto[];
}

export class PortfolioRequestCreateDto implements IPortfolioRequestCreateDto {
    name: string;
    start_date: string;
    initial_balance: number;
    user_id: number;
    assets: IAssetCreateDto[];
}
