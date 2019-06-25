export interface IAssetResponseDto {
    symbol: string;
    percentage: string;
    earnings_percentage: string;
    initial_date: Date;
    initial_value: number;
    initial_balance: string;
    final_date: Date;
    final_value: number;
    final_balance: string;
}

export class AssetResponseDto {
    public symbol: string;
    public percentage: string;
    public earnings_percentage: string;
    public initial_date: Date;
    public initial_value: number;
    public initial_balance: string;
    public final_date: Date;
    public final_value: number;
    public final_balance: string;
}
