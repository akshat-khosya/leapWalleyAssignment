import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "users",
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
    })
    user_id!: string;
}
