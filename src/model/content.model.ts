import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";

@Table({
    timestamps: false,
    tableName: "content",
})
export class Content extends Model {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
    })
    content_id!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
    })
    user_id!: string;

    @BelongsTo(() => User)
    user!: User;
}
