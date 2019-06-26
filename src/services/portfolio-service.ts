import { reject } from "bluebird";
import { WorldTradingDataIntegrationService } from "../integration/world-trading-data-integration-service";
import { WorldTradingDataMapper } from "../integration/world-trading-data-mapper";
import { PortfolioMapper } from "../mappers/portfolio-mapper";
import { IWorldTradingDataResponseDto } from "../model/integration/world-trading-data-response-dto";
import { IPortfolioRequestDto } from "../model/portfolios/portfolio-request-dto";
import { Logger } from "../utils/logger";
import { LoggerFactory } from "../utils/logger-factory";
import { PortfolioValidator } from "../validator/portfolio-validator";

export class PortfolioService {
    private readonly logger: Logger = LoggerFactory.create(PortfolioService.name);

    private readonly worldTradingDataMapper: WorldTradingDataMapper = new WorldTradingDataMapper();
    private readonly portfolioValidator: PortfolioValidator = new PortfolioValidator();
    private readonly portfolioMapper: PortfolioMapper = new PortfolioMapper();
    private readonly worldTradingDataIntegrationService: WorldTradingDataIntegrationService = new WorldTradingDataIntegrationService(this.worldTradingDataMapper);

    public async calculateActualBalance(params: any) {
        let portfolioRequestDto: IPortfolioRequestDto;
        let currentValues: IWorldTradingDataResponseDto[];
        this.portfolioValidator.validateRequest(params);

        portfolioRequestDto = this.portfolioMapper.mapRequest(params);

        currentValues = await this.worldTradingDataIntegrationService.getSymbolsActualValue(portfolioRequestDto.start_date,
            portfolioRequestDto.allocation.map((asset) => asset.symbol))
            .catch((error) => {
                throw error;
            });

        return this.worldTradingDataMapper.getEarnings(portfolioRequestDto, currentValues);
    }
}
