import mongoose = require("mongoose");

export interface IPrices {
    createdAt: Date;
    date: Date;
    smrCvUsd: number;
    smrLUsd: number;
    smr5Usd: number;
    smr10Usd: number;
    smr20Usd: number;
    latexUsd: number;
    smrCvSen: number;
    smrLSen: number;
    smr5Sen: number;
    smr10Sen: number;
    smr20Sen: number;
    latexSen: number;
}

export interface IPricesModel extends IPrices, mongoose.Document {
}
