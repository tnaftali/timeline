import moment from "moment";
import { DATE_FORMAT, MESSAGES } from "../constants";
import { IPriceDto, PriceDto } from "../model/integration/price-dto";
import { IWorldTradingDataResponseDto, WorldTradingDataResponseDto } from "../model/integration/world-trading-data-response-dto";
import { IAssetDto } from "../model/portfolios/asset-dto";
import { AssetResponseDto, IAssetResponseDto } from "../model/portfolios/asset-response-dto";
import { IPortfolioRequestDto } from "../model/portfolios/portfolio-request-dto";
import { IPortfolioResponseDto, PortfolioResponseDto } from "../model/portfolios/portfolio-response-dto";
import { Logger } from "../utils/logger";
import { LoggerFactory } from "../utils/logger-factory";
import { MathUtils } from "../utils/math-utils";

export class WorldTradingDataMapper {
    private readonly logger: Logger = LoggerFactory.create(WorldTradingDataMapper.name);

    public mapResponseToDto(response: any): IWorldTradingDataResponseDto {
        this.logger.info(MESSAGES.MAPPING_RESPONSE);

        const responseDto = new WorldTradingDataResponseDto();
        responseDto.name = response.name;

        const lastPriceDto: IPriceDto = new PriceDto();
        const lastPriceResponse = response.history[Object.keys(response.history)[0]];
        const date = moment(Object.keys(response.history)[0], DATE_FORMAT).toDate();
        lastPriceDto.date = date;
        lastPriceDto.close = lastPriceResponse.close;
        responseDto.lastPrice = lastPriceDto;

        return responseDto;
    }

    public getEarnings(portfolioRequestDto: IPortfolioRequestDto, responsesDto: IWorldTradingDataResponseDto[]): IPortfolioResponseDto {
        this.logger.info(MESSAGES.BUILDING_RESPONSE);
        const portfolioResponseDto = new PortfolioResponseDto();
        portfolioResponseDto.initial_date = moment(portfolioRequestDto.start_date).format(DATE_FORMAT);
        portfolioResponseDto.initial_balance = `${portfolioRequestDto.initial_balance.toFixed(2)}`;
        portfolioResponseDto.assets = this.calculateForAssets(portfolioRequestDto, responsesDto);
        portfolioResponseDto.final_balance = `${portfolioResponseDto.assets
            .map((asset: IAssetResponseDto) => parseFloat(asset.final.balance))
            .reduce((a: number, c: number) => a + c).toFixed(2)}`;

        return portfolioResponseDto;
    }

    private calculateForAssets(portfolioRequestDto: IPortfolioRequestDto, responsesDto: IWorldTradingDataResponseDto[]): IAssetResponseDto[] {
        const assetResponseDtoList: IAssetResponseDto[] = [];
        portfolioRequestDto.allocation.forEach((asset: IAssetDto) => {
            const assetResponses = responsesDto.filter((response) => response.name === asset.symbol);

            assetResponses.sort((a, b) => {
                return a.lastPrice.date.getTime() - b.lastPrice.date.getTime();
            });

            const oldAssetResponse: IWorldTradingDataResponseDto = assetResponses[0];
            const newAssetResponse: IWorldTradingDataResponseDto = assetResponses[1];
            const assetResponseDto: IAssetResponseDto = this.getAsset(portfolioRequestDto, oldAssetResponse, newAssetResponse, asset.symbol);

            assetResponseDtoList.push(assetResponseDto);
        });

        return assetResponseDtoList;
    }

    private getPercentage(portfolioRequestDto: IPortfolioRequestDto, asset: string): number {
        return portfolioRequestDto.allocation.find((requestAsset) => requestAsset.symbol === asset).percentage;
    }

    private getAsset(portfolioRequestDto: IPortfolioRequestDto, oldAsset: IWorldTradingDataResponseDto, newAsset: IWorldTradingDataResponseDto, symbol: string) {
        const assetResponseDto: IAssetResponseDto = new AssetResponseDto();
        assetResponseDto.symbol = symbol;
        const initial_percentage = this.getPercentage(portfolioRequestDto, symbol);
        assetResponseDto.allocation = `${initial_percentage}%`;

        const variationPercentage = MathUtils.getEarningsPercentage(newAsset.lastPrice.close, oldAsset.lastPrice.close);
        assetResponseDto.variation = `${(variationPercentage * 100).toFixed(2)}%`;

        assetResponseDto.initial.date = moment(oldAsset.lastPrice.date).format(DATE_FORMAT);
        assetResponseDto.initial.value = `${oldAsset.lastPrice.close}`;
        const initialBalance = ((initial_percentage / 100) * portfolioRequestDto.initial_balance);
        assetResponseDto.initial.balance = `${initialBalance.toFixed(2)}`;

        assetResponseDto.final.date = moment(newAsset.lastPrice.date).format(DATE_FORMAT);
        assetResponseDto.final.value = `${newAsset.lastPrice.close}`;
        const finalBalance: number = MathUtils.getFinalBalance(initialBalance, variationPercentage);
        assetResponseDto.final.balance = `${finalBalance.toFixed(2)}`;

        assetResponseDto.earnings = `${(finalBalance - initialBalance).toFixed(2)}`;

        return assetResponseDto;
    }
}
