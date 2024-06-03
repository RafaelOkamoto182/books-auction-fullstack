import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOfferTable1717384613050 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `
            CREATE TABLE IF NOT EXISTS public.offer (
                offer_id UUID NOT NULL PRIMARY KEY,
                seller_id UUID NOT NULL,
                book_name VARCHAR NOT NULL,
                book_author VARCHAR NOT NULL,
                book_genre VARCHAR NOT NULL,
                desirable_price NUMERIC(10,2),
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
              
                CONSTRAINT fk_seller
                    FOREIGN KEY (seller_id) REFERENCES seller(seller_id)
            );
            
            CREATE INDEX idx_seller_offer ON offer(seller_id)
            
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `DROP TABLE public.offer`
        )
    }

}
