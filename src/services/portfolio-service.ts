import { PortfolioDao } from "../dao/portfolio.dao";
import { PortfolioMapper } from "../mappers/portfolio-mapper";
import { WorldTradingDataMapper } from "../mappers/world-trading-data-mapper";
import { IPortfolioRequestDto } from "../models/dto/portfolio-request-dto";
import { IWorldTradingDataResponseDto } from "../models/dto/world-trading-data-response-dto";
import { Portfolio } from "../models/Portfolio";
import { Logger } from "../utils/logger";
import { LoggerFactory } from "../utils/logger-factory";
import { PortfolioValidator } from "../validator/portfolio-validator";
import { WorldTradingDataIntegrationService } from "./world-trading-data-integration-service";

export class PortfolioService {
    private readonly logger: Logger = LoggerFactory.create(PortfolioService.name);

    private readonly worldTradingDataMapper: WorldTradingDataMapper = new WorldTradingDataMapper();

    private readonly portfolioMapper: PortfolioMapper = new PortfolioMapper();
    private readonly worldTradingDataIntegrationService: WorldTradingDataIntegrationService = new WorldTradingDataIntegrationService(this.worldTradingDataMapper);

    private readonly portfolioDao: PortfolioDao = new PortfolioDao();
    private readonly portfolioValidator: PortfolioValidator = new PortfolioValidator(this.portfolioDao);

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

    public async get(id: number) {
        await this.portfolioValidator.validateId(id);

        const portfolio: Portfolio = await this.portfolioDao.get(id);

        let currentValues: IWorldTradingDataResponseDto[];
        currentValues = await this.worldTradingDataIntegrationService.getSymbolsActualValue(portfolio.start_date,
            portfolio.assets.map((asset) => asset.symbol))
            .catch((ex) => {
                throw ex;
            });

        return this.worldTradingDataMapper.getEarnings2(portfolio, currentValues);
    }

    public async create(request: any): Promise<Portfolio> {
        this.portfolioValidator.validateRequest(request);

        return await this.portfolioDao.save(request);
    }
}
