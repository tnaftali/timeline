import { WorldTradingDataIntegrationService } from "../integration/world-trading-data-integration-service";
import { PortfolioMapper } from "../mappers/portfolio-mapper";
import { WorldTradingDataResponseDto } from "../model/integration/world-trading-data-response-dto";
import { PortfolioRequestDto } from "../model/portfolios/portfolio-request-dto";
import { Logger } from "../utils/logger";
import { LoggerFactory } from "../utils/logger-factory";
import { MathUtils } from "../utils/math-utils";

export class PortfolioService {
    private readonly logger: Logger = LoggerFactory.create(PortfolioService.name);
    private readonly ERROR = "There was an error getting the updated values, please try again";

    private worldTradingDataIntegrationService: WorldTradingDataIntegrationService
        = new WorldTradingDataIntegrationService();

    public async calculateActualBalance(params: any) {
        // portfolioValidator.validateRequest();

        const portfolioRequestDto: PortfolioRequestDto = PortfolioMapper.mapRequest(params);

        let currentValues: WorldTradingDataResponseDto[];
        try {
            currentValues = await this.worldTradingDataIntegrationService.getSymbolsActualValue(portfolioRequestDto.start_date, portfolioRequestDto.allocation.map((asset) => asset.symbol));
        } catch (ex) {
            this.logger.error(this.ERROR);
        }

        console.log(currentValues);

        // MathUtils.getEarnings(portfolioRequestDto, currentValues);

        return currentValues;
    }
}
