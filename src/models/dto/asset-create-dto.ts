export interface IAssetCreateDto {
    symbol: string;
    percentage: number;
}

export class AssetCreateDto implements IAssetCreateDto {
    symbol: string;
    percentage: number;
}
