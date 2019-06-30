export interface IBalanceResponseDto {
    date: string;
    price: number;
    balance: number;
}

export class BalanceResponseDto implements IBalanceResponseDto {
    public date: string;
    public price: number;
    public balance: number;
}
