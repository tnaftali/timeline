import { WorldTradingDataIntegrationService } from "../integration/world-trading-data-integration-service";
import { PortfolioMapper } from "../mappers/portfolio-mapper";
import { PortfolioRequestDto } from "../model/portfolios/portfolio-request-dto";

export class PortfolioService {
    private worldTradingDataIntegrationService: WorldTradingDataIntegrationService
        = new WorldTradingDataIntegrationService();

    public async calculateActualBalance(params: any) {
        // portfolioValidator.validateRequest();

        const portfolioRequestDto: PortfolioRequestDto = PortfolioMapper.mapRequest(params);

        const results = await this.worldTradingDataIntegrationService.getSymbolsActualValue(portfolioRequestDto.allocation.map((asset) => asset.symbol));

        return results;
    }
}
