export interface IAssetDto {
    symbol: string;
    percentage: number;
}

export class AssetDto implements IAssetDto {
    public symbol: string;
    public percentage: number;
}
