import * as express from "express";
import { PricesService } from "../services/prices-service";
import { VariationsService } from "../services/variations-service";
import { Logger } from "../utils/logger";

const initialDate = -8640000000000000;

export const register = (app: express.Application) => {

    const pricesService = new PricesService();
    const variationsService = new VariationsService();

    app.get("/", (req: any, res) => {
        res.send("App running");
    });

    app.get("/prices", async (req: any, res) => {
        Logger.info("GET /prices", "PricesController");

        const from: Date = req.query.from ? new Date(req.query.from) : new Date(initialDate);
        const to: Date = req.query.to ? new Date(req.query.to) : new Date();
        const pricesByDate = await pricesService.getPricesByDateRange(from, to);

        res.json(pricesByDate);
    });
};
