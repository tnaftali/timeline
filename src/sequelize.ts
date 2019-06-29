import { Sequelize } from "sequelize-typescript";
export const sequelize = new Sequelize({
    database: "timeline",
    dialect: "postgres",
    username: "postgres",
    password: "postgres",
    modelPaths: [__dirname + "/models"]
});
