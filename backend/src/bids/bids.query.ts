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
            queryText:
                `
                SELECT bid_id,public.bid.offer_id, price, status, public.bid.updated_at, book_name, desirable_price 
	                FROM public.bid
                INNER JOIN public.offer ON public.bid.offer_id = public.offer.offer_id
                WHERE public.bid.bid_id=$1
                ORDER BY updated_at
                `,
            queryValues: [id]
        })
    },

    selectBySellerId(id: string) {
        return ({
            queryText:
                `
                SELECT bid_id,public.bid.offer_id, price, status, public.bid.updated_at, book_name, desirable_price 
	                FROM public.bid
                INNER JOIN public.offer ON public.bid.offer_id = public.offer.offer_id
                WHERE public.offer.seller_id=$1
                ORDER BY updated_at
                `,
            queryValues: [id]
        })
    },

    selectByBuyerId(id: string) {
        return ({
            queryText:
                `
                SELECT bid_id,public.bid.offer_id, price, status, public.bid.updated_at, book_name, book_author, book_genre 
	                FROM public.bid
                INNER JOIN public.offer ON public.bid.offer_id = public.offer.offer_id
                WHERE public.bid.buyer_id=$1
                ORDER BY updated_at
                `,
            queryValues: [id]
        })
    },

    delete(id: string) {
        return ({
            queryText: `DELETE FROM public.bid WHERE bid_id=$1`,
            queryValues: [id]
        })
    }
}