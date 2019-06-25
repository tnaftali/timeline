export interface IAssetDto {
    symbol: string;
    percentage: Number;
}

export class AssetDto implements IAssetDto {
    public symbol: string;
    public percentage: Number;
}
