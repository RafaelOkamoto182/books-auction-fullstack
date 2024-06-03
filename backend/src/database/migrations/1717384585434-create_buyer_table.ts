import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBuyerTable1717384585434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `
            CREATE TABLE IF NOT EXISTS public.buyer (
                buyer_id UUID NOT NULL PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR NOT NULL,
                user_type VARCHAR(20) DEFAULT 'buyer' NOT NULL,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL
            );
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `DROP TABLE public.buyer`
        )
    }

}
