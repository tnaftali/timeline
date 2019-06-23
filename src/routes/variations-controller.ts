import * as express from "express";
import { VariationsService } from "../services/variations-service";
import { Logger } from "../utils/logger";

export const register = (app: express.Application) => {
    const variationsService = new VariationsService();

    app.get("/variations", async (req: any, res) => {
        Logger.info("GET /variations", "VariationsController");

        const variations = await variationsService.getVariations();

        res.json(variations);
    });
};
