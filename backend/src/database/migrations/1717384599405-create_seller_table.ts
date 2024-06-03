import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSellerTable1717384599405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `
            CREATE TABLE IF NOT EXISTS public.seller (
                seller_id UUID NOT NULL PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR NOT NULL,
                user_type VARCHAR(20) DEFAULT 'seller' NOT NULL,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL
            );
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `DROP TABLE public.seller`
        )
    }

}
