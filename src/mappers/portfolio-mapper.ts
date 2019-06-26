import { MESSAGES } from "../constants";
import { AssetDto, IAssetDto } from "../model/portfolios/asset-dto";
import { IPortfolioRequestDto, PortfolioRequestDto } from "../model/portfolios/portfolio-request-dto";
import { Logger } from "../utils/logger";
import { LoggerFactory } from "../utils/logger-factory";

export class PortfolioMapper {
    private readonly logger: Logger = LoggerFactory.create(PortfolioMapper.name);

    public mapRequest(params: any): IPortfolioRequestDto {
        this.logger.info(MESSAGES.MAPPING_REQUEST);

        const portfolioRequestDto = new PortfolioRequestDto();
        portfolioRequestDto.start_date = new Date(params.start_date);
        portfolioRequestDto.initial_balance = +params.initial_balance;

        const assets: IAssetDto[] = [];
        const allocationMap = params.allocation.trim().split(";");
        allocationMap.forEach((asset: string) => {
            const assetDto = new AssetDto();
            assetDto.symbol = asset.split(":")[0];
            assetDto.percentage = +asset.split(":")[1];
            assets.push(assetDto);
        });
        portfolioRequestDto.allocation = assets;

        return portfolioRequestDto;
    }
}
