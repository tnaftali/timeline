import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// import { FRONTEND_URL } from "./constants";
import * as portfolioRoutes from "./routes/portfolio-controller";
import { PricesScheduler } from "./schedulers/prices-scheduler";
import { Logger } from "./utils/logger";

dotenv.config();

const port = process.env.PORT;
const app = express();

// const corsOptions = {
//     origin: FRONTEND_URL,
//     optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));

portfolioRoutes.register(app);

const dbHost = process.env.MONGODB_URI;
mongoose.connect(dbHost, { useNewUrlParser: true });

app.listen(port, () => {
    Logger.info(`Server started at http://localhost:${port}`, "server.ts");
});

const priceScheduler = new PricesScheduler();
priceScheduler.schedule();