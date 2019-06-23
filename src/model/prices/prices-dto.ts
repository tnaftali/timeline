export interface IPricesDto {
    date: Date;
    smrCvUsd: number;
    smrLUsd: number;
    smr5Usd: number;
    smr10Usd: number;
    smr20Usd: number;
    latexUsd: number;
    smrCvSen: number;
    smrLSen: number;
    smr5Sen: number;
    smr10Sen: number;
    smr20Sen: number;
    latexSen: number;
}

export class PricesDto implements IPricesDto {
    public date: Date;
    public smrCvUsd: number;
    public smrLUsd: number;
    public smr5Usd: number;
    public smr10Usd: number;
    public smr20Usd: number;
    public latexUsd: number;
    public smrCvSen: number;
    public smrLSen: number;
    public smr5Sen: number;
    public smr10Sen: number;
    public smr20Sen: number;
    public latexSen: number;
}
