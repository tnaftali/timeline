import { MESSAGES } from "../constants";
import { PortfolioDao } from "../dao/portfolio.dao";
import { ValidationError } from "../errors/validation-error";
import { IAssetCreateDto } from "../models/dto/asset-create-dto";
import { AssetCreateDto } from "../models/dto/asset-create-dto";
import { IPortfolioRequestCreateDto, PortfolioRequestCreateDto } from "../models/dto/portfolio-request-create-dto";
import { Logger } from "../utils/logger";

export class PortfolioValidator {
    private portfolioDao: PortfolioDao;
    private logger: Logger = new Logger(PortfolioValidator.name);

    constructor(portfolioDao: PortfolioDao) {
        this.portfolioDao = portfolioDao;
    }

    public validateRequest(request: any) {
        this.logger.info("Validating portfolio request");
        try {
            this.hasValue(request.name, "name");
            this.hasValue(request.name, "start_date");
            this.hasValue(request.name, "initial_balance");
            this.hasValue(request.name, "user_id");

            this.validateAssets(request.assets);
        } catch (err) {
            throw err;
        }
    }

    public async validateId(id: number) {
        const exists = await this.portfolioDao.exists(id);
        if (!exists) {
            throw new ValidationError(404, `Portfolio with id: ${id} was not found`);
        }
    }

    private hasValue(property: any, propertyName: string) {
        if (property === null || property === undefined) {
            throw new ValidationError(400, `${propertyName} is required`);
        }
    }

    private validateAssets(assetsRequest: any) {
        assetsRequest.forEach((assetRequest: any) => {
            this.hasValue(assetRequest.symbol, "symbol");
            this.hasValue(assetRequest.symbol, "percentage");
        });
    }

}
