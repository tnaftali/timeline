import { Router } from "express";
import { MESSAGES } from "../constants";
import { PortfolioService } from "../services/portfolio-service";
import { Logger } from "../utils/logger";
import { LoggerFactory } from "../utils/logger-factory";

export const portfolios = Router();

const logger: Logger = LoggerFactory.create("PortfolioController");
const portfolioService = new PortfolioService();

portfolios.get("/", (req: any, res) => {
    res.send(MESSAGES.APP_RUNNING);
});

portfolios.get("/current_value", async (req, res, next) => {
    logger.info(MESSAGES.GET_PORTFOLIO);
    let results;
    results = await portfolioService.calculateActualBalance(req.query)
        .catch((ex) => {
            logger.error(ex);
            res.status(ex.error_code).send(ex);
        });

    res.json(results);
});

portfolios.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    const portfolio = await portfolioService.get(id)
        .catch((ex) => {
            logger.error(ex);
            res.status(ex.error_code).send(ex);
        });

    res.json(portfolio);
});

portfolios.post("/create", async (req, res, next) => {
    const results = await portfolioService.create(req.body)
        .catch((ex) => {
            logger.error(JSON.stringify(ex));
            res.status(ex.error_code).send(ex);
        });

    res.status(201).json(results);
});
