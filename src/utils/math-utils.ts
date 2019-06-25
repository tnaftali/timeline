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

        MathUtils.calculateForAssets(portfolioRequestDto, responsesDto);

        return portfolioResponseDto;
    }

    private static calculateForAssets(portfolioRequestDto: PortfolioRequestDto, responsesDto: WorldTradingDataResponseDto[]): IAssetResponseDto[] {
        const assetResponseDtoList: IAssetResponseDto[] = [];
        responsesDto.forEach((responseDto) => {
            const assetResponseDto: IAssetResponseDto = new AssetResponseDto();
            assetResponseDto.percentage = portfolioRequestDto.allocation.find((asset) => asset.symbol === responseDto.name).percentage;
            assetResponseDto.initial_value = (assetResponseDto.percentage * portfolioRequestDto.initial_balance) / 100;
            assetResponseDto.final_value = responseDto.lastPrice.close;
            console.log(assetResponseDto);
            // assetResponseDto.
        });

        return assetResponseDtoList;
    }
}
