import Prices = require("../model/prices/prices");
import { IPricesDto, PricesDto } from "../model/prices/prices-dto";
import { IPricesModel } from "../model/prices/prices-model";
import { Logger } from "../utils/logger";

export class PricesMapper {
    public static mapResponseToPrices(responseBody: string): IPricesModel {
        Logger.info(this.MAPPING_PRICES_RESPONSE, PricesMapper.name);

        const stringDate = responseBody
            .match(this.dateRegex)[0]
            .match(this.dateValueRegex)[0];
        const dateArray = stringDate.split("/");
        const priceDate = new Date(
            parseInt(dateArray[2]),
            parseInt(dateArray[1]) - 1,
            parseInt(dateArray[0]),
        );

        priceDate.setUTCHours(0, 0, 0, 0);

        const smrCvUsd = +(+responseBody
            .match(this.spanRegex[0])[0]
            .match(this.numberRegex)[0]).toFixed(2);
        const smrLUsd = +(+responseBody
            .match(this.spanRegex[1])[0]
            .match(this.numberRegex)[0]).toFixed(2);
        const smr5Usd = +(+responseBody
            .match(this.spanRegex[2])[0]
            .match(this.numberRegex)[0]).toFixed(2);
        const smr10Usd = +(+responseBody
            .match(this.spanRegex[3])[0]
            .match(this.numberRegex)[0]).toFixed(2);
        const smr20Usd = +(+responseBody
            .match(this.spanRegex[4])[0]
            .match(this.numberRegex)[0]).toFixed(2);
        const smrCvSen = +(+responseBody
            .match(this.spanRegex[5])[0]
            .match(this.numberRegex)[0]).toFixed(2);
        const smrLSen = +(+responseBody
            .match(this.spanRegex[6])[0]
            .match(this.numberRegex)[0]).toFixed(2);
        const smr5Sen = +(+responseBody
            .match(this.spanRegex[7])[0]
            .match(this.numberRegex)[0]).toFixed(2);
        const smr10Sen = +(+responseBody
            .match(this.spanRegex[8])[0]
            .match(this.numberRegex)[0]).toFixed(2);
        const smr20Sen = +(+responseBody
            .match(this.spanRegex[9])[0]
            .match(this.numberRegex)[0]).toFixed(2);
        const latexSen = +((+responseBody
            .match(this.spanRegex[10])[0]
            .match(this.numberRegex)[0]).toFixed(2));

        const usdConversion = smrCvSen / smrCvUsd;
        const latexUsd = (latexSen / usdConversion).toFixed(2);

        return new Prices({
            createdAt: Date(),
            date: priceDate,
            smrCvUsd,
            smrLUsd,
            smr5Usd,
            smr10Usd,
            smr20Usd,
            latexUsd,
            smrCvSen,
            smrLSen,
            smr5Sen,
            smr10Sen,
            smr20Sen,
            latexSen,
        });
    }

    public static toPricesDto(pricesModel: IPricesModel): IPricesDto {
        const pricesDto = new PricesDto();

        pricesDto.date = pricesModel.date;
        pricesDto.smrCvUsd = pricesModel.smrCvUsd;
        pricesDto.smrLUsd = pricesModel.smrLUsd;
        pricesDto.smr5Usd = pricesModel.smr5Usd;
        pricesDto.smr10Usd = pricesModel.smr10Usd;
        pricesDto.smr20Usd = pricesModel.smr20Usd;
        pricesDto.latexUsd = pricesModel.latexUsd;

        pricesDto.smrCvSen = pricesModel.smrCvSen;
        pricesDto.smrLSen = pricesModel.smrLSen;
        pricesDto.smr5Sen = pricesModel.smr5Sen;
        pricesDto.smr10Sen = pricesModel.smr10Sen;
        pricesDto.smr20Sen = pricesModel.smr20Sen;
        pricesDto.latexSen = pricesModel.latexSen;

        return pricesDto;
    }

    private static readonly dateRegex = /\<font\scolor\=maroon\>\d+\/\d+\/\d+/g;
    private static readonly dateValueRegex = /\d+\/\d+\/\d+/g;
    private static readonly spanRegex = [
        /\<\w*\s\w+\=\"_ctl0_ContentPlaceHolder1_dgCurrent__ctl2_csellUS\"\>\d*.\d*\<\/\w*>/g,
        /\<\w*\s\w+\=\"_ctl0_ContentPlaceHolder1_dgCurrent__ctl3_csellUS\"\>\d*.\d*\<\/\w*>/g,
        /\<\w*\s\w+\=\"_ctl0_ContentPlaceHolder1_dgCurrent__ctl4_csellUS\"\>\d*.\d*\<\/\w*>/g,
        /\<\w*\s\w+\=\"_ctl0_ContentPlaceHolder1_dgCurrent__ctl5_csellUS\"\>\d*.\d*\<\/\w*>/g,
        /\<\w*\s\w+\=\"_ctl0_ContentPlaceHolder1_dgCurrent__ctl6_csellUS\"\>\d*.\d*\<\/\w*>/g,
        /\<\w*\s\w+\=\"_ctl0_ContentPlaceHolder1_dgCurrent__ctl2_csellRM\"\>\d*.\d*\<\/\w*>/g,
        /\<\w*\s\w+\=\"_ctl0_ContentPlaceHolder1_dgCurrent__ctl3_csellRM\"\>\d*.\d*\<\/\w*>/g,
        /\<\w*\s\w+\=\"_ctl0_ContentPlaceHolder1_dgCurrent__ctl4_csellRM\"\>\d*.\d*\<\/\w*>/g,
        /\<\w*\s\w+\=\"_ctl0_ContentPlaceHolder1_dgCurrent__ctl5_csellRM\"\>\d*.\d*\<\/\w*>/g,
        /\<\w*\s\w+\=\"_ctl0_ContentPlaceHolder1_dgCurrent__ctl6_csellRM\"\>\d*.\d*\<\/\w*>/g,
        /\<\w*\s\w+\=\"_ctl0_ContentPlaceHolder1_lblBulkNoon_S\"\>\d*.\d*\<\/\w*>/g,
    ];
    private static readonly numberRegex = /\d+.\d+/g;

    private static readonly MAPPING_PRICES_RESPONSE = "Mapping prices response";
}
