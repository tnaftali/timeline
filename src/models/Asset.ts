import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Portfolio } from "./Portfolio";

@Table({
    tableName: "assets",
    underscored: true
})
export class Asset extends Model<Asset> {
    @Column
    symbol: string;

    @Column({ type: DataType.FLOAT })
    inital_balance: number;

    @Column
    percentage: number;

    @ForeignKey(() => Portfolio)
    @Column
    portfolio_id: number;

    @BelongsTo(() => Portfolio)
    portfolio!: Portfolio;
}
