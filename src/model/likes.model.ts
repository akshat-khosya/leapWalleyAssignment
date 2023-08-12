import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";
import { Content } from "./content.model";

@Table({
    timestamps: false,
    tableName: "likes",
})
export class Likes extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
    })
    id!: number;

    @ForeignKey(() => Content)
    @Column({
        type: DataType.STRING,
        primaryKey: false
    })
    content_id!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        primaryKey: false
    })
    user_id!: string;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Content)
    content!: Content;
}
