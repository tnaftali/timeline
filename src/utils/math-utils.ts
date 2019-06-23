import { IPricesDto } from "../model/prices/prices-dto";
import { IVariationDetailsDto, VariationDetailsDto } from "../model/variations/variation-details-dto";
import { Logger } from "./logger";

export abstract class MathUtils {

    public static getVariationPercentage(oldPrices: IPricesDto, actualPrices: IPricesDto): IVariationDetailsDto {
        const variations = new VariationDetailsDto();

        variations.from = oldPrices.date;
        variations.to = actualPrices.date;

        variations.smrCvUsd = this.calculateVariation(oldPrices.smrCvUsd, actualPrices.smrCvUsd);
        variations.smrLUsd = this.calculateVariation(oldPrices.smrLUsd, actualPrices.smrLUsd);
        variations.smr5Usd = this.calculateVariation(oldPrices.smr5Usd, actualPrices.smr5Usd);
        variations.smr10Usd = this.calculateVariation(oldPrices.smr10Usd, actualPrices.smr10Usd);
        variations.smr20Usd = this.calculateVariation(oldPrices.smr20Usd, actualPrices.smr20Usd);
        variations.latexUsd = this.calculateVariation(oldPrices.latexUsd, actualPrices.latexUsd);

        variations.smrCvSen = this.calculateVariation(oldPrices.smrCvSen, actualPrices.smrCvSen);
        variations.smrLSen = this.calculateVariation(oldPrices.smrLSen, actualPrices.smrLSen);
        variations.smr5Sen = this.calculateVariation(oldPrices.smr5Sen, actualPrices.smr5Sen);
        variations.smr10Sen = this.calculateVariation(oldPrices.smr10Sen, actualPrices.smr10Sen);
        variations.smr20Sen = this.calculateVariation(oldPrices.smr20Sen, actualPrices.smr20Sen);
        variations.latexSen = this.calculateVariation(oldPrices.latexSen, actualPrices.latexSen);

        return variations;
    }

    private static calculateVariation(oldPrice: number, actualPrice: number): number {
        return parseFloat((((actualPrice / oldPrice) - 1) * 100).toFixed(2));
    }
}
