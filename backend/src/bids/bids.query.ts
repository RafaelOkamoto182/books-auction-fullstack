import { OutputCreateBidDto } from "./dto/create-bid.dto";

export const bidsQuery = {
    create(parameters: OutputCreateBidDto) {
        return ({
            queryText: `INSERT INTO public.bid(
                bid_id, offer_id, buyer_id, price)
                VALUES (gen_random_uuid(), $1, $2, $3);`,
            queryValues: [parameters.offer_id, parameters.buyer_id, parameters.bid_amount]
        })
    },

    selectById(id: string) {
        return ({
            queryText: `SELECT * FROM public.bid WHERE bid_id=$1`,
            queryValues: [id]
        })
    },

    select() {
        return ({
            queryText: `SELECT * FROM public.bid`
        })
    },

    delete(id: string) {
        return ({
            queryText: `DELETE FROM public.bid WHERE bid_id=$1`,
            queryValues: [id]
        })
    }
}