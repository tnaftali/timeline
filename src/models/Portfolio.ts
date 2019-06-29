import { BelongsTo, BelongsToMany, Column, CreatedAt, DataType, ForeignKey, HasMany, HasOne, Model, Scopes, Table, UpdatedAt } from "sequelize-typescript";
import { Asset } from "./Asset";
import { User } from "./User";

@Table({
    tableName: "portfolios",
    underscored: true
})
export class Portfolio extends Model<Portfolio> {
    @Column
    name: string;

    @Column
    start_date: Date;

    @Column({ type: DataType.FLOAT })
    initial_balance: number;

    @HasMany(() => Asset)
    assets!: Asset[];

    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @BelongsTo(() => User)
    user!: User;
}
