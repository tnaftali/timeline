import { CommunicationError } from "../errors/communication-error";
import { Asset } from "../models/Asset";
import { IAssetCreateDto } from "../models/dto/asset-create-dto";
import { IPortfolioRequestCreateDto } from "../models/dto/portfolio-request-create-dto";
import { Portfolio } from "../models/Portfolio";
import { Logger } from "../utils/logger";

export class PortfolioDao {

    private logger: Logger = new Logger(PortfolioDao.name);

    public async exists(id: number): Promise<Boolean> {
        return await Portfolio
            .count({ where: { id } })
            .then((count) => count > 0);
    }

    public async get(id: number): Promise<Portfolio> {
        return await Portfolio
            .findOne({
                where: { id },
                include: [{
                    model: Asset
                }]
            });
    }

    public async save(request: IPortfolioRequestCreateDto): Promise<Portfolio> {
        const portfolio = await Portfolio.create<Portfolio>({
            name: request.name,
            start_date: new Date(request.start_date),
            initial_balance: request.initial_balance,
            user_id: request.user_id
        })
            .catch((ex) => {
                this.logger.error(ex);
                throw new CommunicationError(500, "Error saving portfolio");
            });

        const assets: Asset[] = [];
        request.assets.forEach(async (assetRequest: IAssetCreateDto) => {
            const createdAsset = await Asset.create({
                symbol: assetRequest.symbol,
                inital_balance: portfolio.initial_balance * (assetRequest.percentage / 100),
                percentage: assetRequest.percentage,
                portfolio_id: portfolio.id
            })
                .catch((ex) => {
                    this.logger.error(ex);
                    throw new CommunicationError(500, "Error saving portfolio");
                });

            assets.push(createdAsset);
        });

        portfolio.assets = assets;

        return portfolio;
    }
}
