import mongoose = require("mongoose");
import { IPricesModel } from "./prices-model";
import PricesSchema = require("./prices-schema");

const Prices = mongoose.model<IPricesModel>("Prices", PricesSchema);

export = Prices;
