export interface IAssetResponseDto {
    symbol: string;
    percentage: number;
    earnings_percentage: number;
    initial_value: number;
    final_value: number;
}

export class AssetResponseDto {
    public symbol: string;
    public percentage: number;
    public earnings_percentage: number;
    public initial_value: number;
    public final_value: number;
}
