import { AssetDto, IAssetDto } from "../model/portfolios/asset-dto";
import { IPortfolioRequestDto, PortfolioRequestDto } from "../model/portfolios/portfolio-request-dto";
import { Logger } from "../utils/logger";
import { LoggerFactory } from "../utils/logger-factory";

export abstract class PortfolioMapper {

    public static mapRequest(params: any): IPortfolioRequestDto {
        this.logger.info("Mapping request to portfolio");

        const portfolioRequestDto = new PortfolioRequestDto();
        portfolioRequestDto.start_date = new Date(params.start_date);
        portfolioRequestDto.initial_balance = +params.initial_balance;

        const assets: IAssetDto[] = [];
        const allocationMap = params.allocation.split(";");
        allocationMap.forEach((asset: string) => {
            const assetDto = new AssetDto();
            assetDto.symbol = asset.split(":")[0];
            assetDto.percentage = +asset.split(":")[1];
            assets.push(assetDto);
        });
        portfolioRequestDto.allocation = assets;

        return portfolioRequestDto;
    }
    private static readonly logger: Logger = LoggerFactory.create(PortfolioMapper.name);
}
