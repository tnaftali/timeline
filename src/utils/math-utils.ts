import moment from "moment";
import { WorldTradingDataResponseDto } from "../model/integration/world-trading-data-response-dto";
import { AssetResponseDto, IAssetResponseDto } from "../model/portfolios/asset-response-dto";
import { PortfolioRequestDto } from "../model/portfolios/portfolio-request-dto";
import { IPortfolioResponseDto, PortfolioResponseDto } from "../model/portfolios/portfolio-response-dto";

export abstract class MathUtils {
    public static getEarnings(portfolioRequestDto: PortfolioRequestDto, responsesDto: WorldTradingDataResponseDto[]): IPortfolioResponseDto {
        const portfolioResponseDto = new PortfolioResponseDto();
        portfolioResponseDto.start_date = portfolioRequestDto.start_date;
        portfolioResponseDto.end_date = responsesDto[0].lastPrice.date;
        portfolioResponseDto.initial_balance = portfolioRequestDto.initial_balance;
        portfolioResponseDto.assets = MathUtils.calculateForAssets(portfolioRequestDto, responsesDto);
        // portfolioResponseDto.final_balance = portfolioResponseDto.assets.;

        console.log(portfolioResponseDto);

        return portfolioResponseDto;
    }

    private static calculateForAssets(portfolioRequestDto: PortfolioRequestDto, responsesDto: WorldTradingDataResponseDto[]): IAssetResponseDto[] {
        const assetResponseDtoList: IAssetResponseDto[] = [];
        portfolioRequestDto.allocation.forEach((asset) => {
            const assetResponses = responsesDto.filter((response) => response.name === asset.symbol);

            assetResponses.sort((a, b) => {
                return a.lastPrice.date.getTime() - b.lastPrice.date.getTime();
            });

            const oldAssetValue = assetResponses[0];
            const newAssetValue = assetResponses[1];

            const assetResponseDto: IAssetResponseDto = new AssetResponseDto();
            assetResponseDto.symbol = asset.symbol;
            const initial_percentage = portfolioRequestDto.allocation.find((requestAsset) => requestAsset.symbol === asset.symbol).percentage;
            assetResponseDto.percentage = initial_percentage + "%";

            const earningsPercentage = (((newAssetValue.lastPrice.close / oldAssetValue.lastPrice.close) - 1));
            assetResponseDto.earnings_percentage = (earningsPercentage * 100).toFixed(2) + "%";

            assetResponseDto.initial_date = oldAssetValue.lastPrice.date;
            assetResponseDto.initial_value = oldAssetValue.lastPrice.close;
            const initial_balance = ((initial_percentage / 100) * portfolioRequestDto.initial_balance);
            assetResponseDto.initial_balance = initial_balance.toFixed(2);

            assetResponseDto.final_date = newAssetValue.lastPrice.date;
            assetResponseDto.final_value = newAssetValue.lastPrice.close;
            assetResponseDto.final_balance = (initial_balance + (initial_balance * earningsPercentage)).toFixed(2);

            assetResponseDtoList.push(assetResponseDto);
        });

        return assetResponseDtoList;
    }
}
