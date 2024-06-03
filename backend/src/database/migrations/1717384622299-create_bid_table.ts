import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBidTable1717384622299 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `
            CREATE TABLE IF NOT EXISTS public.bid (
                bid_id UUID NOT NULL PRIMARY KEY,
                offer_id UUID NOT NULL,
                buyer_id UUID NOT NULL,
                price NUMERIC(10,2) NOT NULL,
                status VARCHAR(10) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
              
                CONSTRAINT fk_offer
                    FOREIGN KEY (offer_id) REFERENCES offer(offer_id),
                CONSTRAINT fk_buyer
                    FOREIGN KEY (buyer_id) REFERENCES buyer(buyer_id),
                CONSTRAINT chk_status 
                    CHECK (status IN ('pending', 'accepted', 'declined'))
            );
            
            CREATE INDEX idx_buyer_bids ON bid(buyer_id);
            CREATE INDEX idx_offer_bids ON bid(offer_id);
            CREATE INDEX idx_bids_price ON bid(price);
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `DROP TABLE public.bid`
        )
    }

}
