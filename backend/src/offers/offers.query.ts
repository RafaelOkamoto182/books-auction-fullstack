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

    selectSellerOffers(id: string) {
        return ({
            queryText: `SELECT * FROM public.offer WHERE seller_id =$1`,
            queryValues: [id]
        })
    },

    selectOffersByBookTitle(title: string) {
        return ({
            queryText:
                `
            SELECT offer_id, seller_id, book_name, book_author, book_genre, created_at, updated_at 
            FROM public.offer 
            WHERE book_name ILIKE $1
            `,
            queryValues: [title]
        })
    },

    selectOffersByBookAuthor(author: string) {
        return ({
            queryText:
                `
            SELECT offer_id, seller_id, book_name, book_author, book_genre, created_at, updated_at 
            FROM public.offer 
            WHERE book_author ILIKE $1
            `,
            queryValues: [author]
        })
    },

    selectOffersByBookGenre(genre: string) {
        return ({
            queryText:
                `
            SELECT offer_id, seller_id, book_name, book_author, book_genre, created_at, updated_at 
            FROM public.offer 
            WHERE book_genre ILIKE $1
            `,
            queryValues: [genre]
        })
    },

    delete(id: string) {
        return ({
            queryText: `DELETE FROM public.offer WHERE offer_id=$1`,
            queryValues: [id]
        })
    }


}