export interface IPriceDto {
    date: Date;
    close: string;
}

export class PriceDto implements IPriceDto {
    public date: Date;
    public close: string;
}
