import { IVariationDetailsDto } from "./variation-details-dto";

export interface IVariationsDto {
    daily: IVariationDetailsDto;
    weekly: IVariationDetailsDto;
    monthly: IVariationDetailsDto;
    yearly: IVariationDetailsDto;
}

export class VariationsDto implements IVariationsDto {
    public daily: IVariationDetailsDto;
    public weekly: IVariationDetailsDto;
    public monthly: IVariationDetailsDto;
    public yearly: IVariationDetailsDto;
}
