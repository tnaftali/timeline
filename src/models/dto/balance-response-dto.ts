export interface IBalanceResponseDto {
    date: string;
    value: string;
    balance: string;
}

export class BalanceResponseDto implements IBalanceResponseDto {
    public date: string;
    public value: string;
    public balance: string;
}
