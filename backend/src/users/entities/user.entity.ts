import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export enum UserType {
    BUYER = "buyer",
    SELLER = "seller"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 50, unique: true })
    username: string

    @Column({ type: "varchar", length: 255 })
    password: string

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.BUYER
    })
    user_type: UserType

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}