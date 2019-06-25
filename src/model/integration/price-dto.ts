export interface IPriceDto {
    date: Date;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
}

export class PriceDto implements IPriceDto {
    public date: Date;
    public open: number;
    public close: number;
    public high: number;
    public low: number;
    public volume: number;
}
