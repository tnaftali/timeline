import { PricesDao } from "../dao/prices-dao";
import { PricesMapper } from "../mappers/prices-mapper";
import { IPricesModel } from "../model/prices/prices-model";
import { IVariationDetailsDto } from "../model/variations/variation-details-dto";
import { IVariationsDto, VariationsDto } from "../model/variations/variations-dto";
import { DateUtils } from "../utils/date-utils";
import { Logger } from "../utils/logger";
import { MathUtils } from "../utils/math-utils";

export class VariationsService {
    private readonly CALCULATING_VARIATIONS = "Calculating variations";

    public async getVariations(): Promise<IVariationsDto> {
        const weekly: Date[] = DateUtils.getOneWeekPeriod();
        const monthly: Date[] = DateUtils.getOneMonthPeriod();
        const yearly: Date[] = DateUtils.getOneYearPeriod();

        const dailyPrices = await PricesDao.getLastPricesObject(2);
        const weeklyPrices = await PricesDao.getPricesByDateRange(weekly[0], weekly[1]);
        const monthlyPrices = await PricesDao.getPricesByDateRange(monthly[0], monthly[1]);
        const yearlyPrices = await PricesDao.getPricesByDateRange(yearly[0], yearly[1]);

        const variationsDto: IVariationsDto = new VariationsDto();

        Logger.info(this.CALCULATING_VARIATIONS, VariationsService.name);

        variationsDto.daily = this.getVariation(dailyPrices.reverse());
        variationsDto.weekly = this.getVariation(weeklyPrices);
        variationsDto.monthly = this.getVariation(monthlyPrices);
        variationsDto.yearly = this.getVariation(yearlyPrices);

        return variationsDto;
    }

    private getVariation(periodPrices: IPricesModel[]): IVariationDetailsDto {
        const periodOld = PricesMapper.toPricesDto(periodPrices[0]);
        const periodActual = PricesMapper.toPricesDto(periodPrices[periodPrices.length - 1]);

        return MathUtils.getVariationPercentage(periodOld, periodActual);
    }
}
