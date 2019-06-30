// import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import * as portfolioRoutes from "./routes/portfolio-controller";
import { Logger } from "./utils/logger";
import { LoggerFactory } from "./utils/logger-factory";

const logger: Logger = LoggerFactory.create("server.ts");

dotenv.config();

const port = process.env.PORT;
const app = express();

// const corsOptions = {
//     origin: FRONTEND_URL,
//     optionsSuccessStatus: 200
// };

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

    next();
});

// app.use(cors(corsOptions));

portfolioRoutes.register(app);

app.listen(port, () => {
    logger.info(`Server started at http://localhost:${port}`);
});
