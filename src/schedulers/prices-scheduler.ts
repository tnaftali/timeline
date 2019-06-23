import cron from "node-cron";
import { PricesDao } from "../dao/prices-dao";
import { PricesService } from "../services/prices-service";
import { Logger } from "../utils/logger";
import { PricesValidator } from "../validators/prices-validator";

export class PricesScheduler {
    private readonly RUNNING_JOB_SCHEDULE =
        "Runing job to get prices, scheduled for every weekday at 04:50 at America/Buenos_Aires timezone";
    private readonly timeZone = "America/Argentina/Buenos_Aires";
    // Every weekday at 04:50 AM
    private readonly timeConfig = "50 04 * * Monday-Tuesday-Wednesday-Thursday-Friday";

    private pricesService: PricesService = new PricesService();
    private pricesValidator: PricesValidator = new PricesValidator();

    public async schedule(): Promise<void> {
        this.execute();
        // const task = cron.schedule(
        //     this.timeConfig,
        //     () => {
        //         Logger.info(this.RUNNING_JOB_SCHEDULE, PricesScheduler.name);

        //         this.execute();
        //     },
        //     {
        //         timezone: this.timeZone,
        //     }
        // );
    }

    private async execute() {
        const prices = await this.pricesService.getPricesFromSource();

        await this.pricesValidator.validateLastPrices(prices).then(() => {
            Logger.info(JSON.stringify(prices), PricesScheduler.name);

            PricesDao.save(prices);
        }).catch((error) => {
            Logger.error(error);
        });
    }
}
