export interface IPriceDto {
    date: Date;
    close: number;
}

export class PriceDto implements IPriceDto {
    public date: Date;
    public close: number;
}
