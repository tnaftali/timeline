import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Portfolio } from "./Portfolio";

@Table({
    tableName: "users",
    underscored: true
})
export class User extends Model<User> {
    @Column
    name: string;

    @HasMany(() => Portfolio)
    portfolios!: Portfolio[];
}
