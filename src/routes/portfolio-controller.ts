import * as express from "express";
import { PortfolioService } from "../services/portfolio-service";
import { Logger } from "../utils/logger";
import { LoggerFactory } from "../utils/logger-factory";

export const register = (app: express.Application) => {
    const logger: Logger = LoggerFactory.create("PortfolioController");
    const portfolioService = new PortfolioService();

    app.get("/", (req: any, res) => {
        res.send("App running");
    });

    app.get("/portfolio", async (req: any, res) => {
        logger.info("GET /portfolio");

        const results = await portfolioService.calculateActualBalance(req.query);

        res.json(results);
    });
};
