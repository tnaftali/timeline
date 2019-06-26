import * as express from "express";
import { MESSAGES } from "../constants";
import { PortfolioService } from "../services/portfolio-service";
import { Logger } from "../utils/logger";
import { LoggerFactory } from "../utils/logger-factory";

export const register = (app: express.Application) => {
    const logger: Logger = LoggerFactory.create("PortfolioController");
    const portfolioService = new PortfolioService();

    app.get("/", (req: any, res) => {
        res.send(MESSAGES.APP_RUNNING);
    });

    app.get("/current_value", async (req: any, res) => {
        logger.info(MESSAGES.GET_PORTFOLIO);
        let results;
        results = await portfolioService.calculateActualBalance(req.query)
            .catch((err) => {
                logger.error(err.error_message);
                res.status(err.error_code).send(err);
            });

        res.json(results);
    });
};
