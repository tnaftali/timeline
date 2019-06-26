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

// app.use(cors(corsOptions));

portfolioRoutes.register(app);

app.listen(port, () => {
    logger.info(`Server started at http://localhost:${port}`);
});
