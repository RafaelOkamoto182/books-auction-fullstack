import { OutputCreateOfferDto } from "./dto/create-offer.dto";

export const offersQuery = {

    create(parameters: OutputCreateOfferDto) {
        return ({
            queryText: `INSERT INTO public.offer(
                offer_id, seller_id, book_name, book_author, book_genre, desirable_price)
                VALUES (gen_random_uuid(), $1, $2, $3, $4, $5);`,
            queryValues: [parameters.seller_id, parameters.book_name, parameters.book_author, parameters.book_genre, parameters.desirable_price]
        })
    },

    selectById(id: string) {
        return ({
            queryText: `SELECT * FROM public.offer WHERE offer_id= $1`,
            queryValues: [id]
        })
    },

    select() {
        return ({
            queryText: `SELECT * FROM public.offer`
        })
    },

    delete(id: string) {
        return ({
            queryText: `DELETE FROM public.offer WHERE offer_id=$1`,
            queryValues: [id]
        })
    }


}