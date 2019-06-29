import { MESSAGES } from "../constants";
import { Asset } from "../models/Asset";
import { IAssetCreateDto } from "../models/dto/asset-create-dto";
import { AssetDto, IAssetDto } from "../models/dto/asset-dto";
import { IPortfolioRequestCreateDto } from "../models/dto/portfolio-request-create-dto";
import { IPortfolioRequestDto, PortfolioRequestDto } from "../models/dto/portfolio-request-dto";
import { Portfolio } from "../models/Portfolio";
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
