import mongoose = require("mongoose");

const Float = require("mongoose-float").loadType(mongoose);

const PricesSchema = new mongoose.Schema({
    createdAt: Date,
    date: Date,
    smrCvUsd: Float,
    smrLUsd: Float,
    smr5Usd: Float,
    smr10Usd: Float,
    smr20Usd: Float,
    latexUsd: Float,
    smrCvSen: Float,
    smrLSen: Float,
    smr5Sen: Float,
    smr10Sen: Float,
    smr20Sen: Float,
    latexSen: Float
});

export = PricesSchema;
