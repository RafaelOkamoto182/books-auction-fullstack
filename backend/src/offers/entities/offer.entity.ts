import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 255 })
    image_URL: string

    @Column({ type: "varchar", length: 255 })
    book_name: string

    @Column({ type: "varchar", length: 100 })
    book_author: string

    @Column({ type: "varchar", length: 100 })
    book_genre: string

    @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
    desirable_price: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}