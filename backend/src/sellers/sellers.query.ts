import { CreateSellerDto } from "./dto/create-seller.dto";

export const sellersQuery = {

    create(parameters: CreateSellerDto) {
        return ({
            queryText: `INSERT INTO public.seller (seller_id, username, password,user_type)
            VALUES (gen_random_uuid(), $1, $2, $3)`,
            queryValues: [parameters.username, parameters.password, parameters.user_type]
        })
    },

    selectById(id: string) {
        return ({
            queryText: `SELECT * FROM seller WHERE seller_id = $1`,
            queryValues: [id]
        })
    },

    selectByUserName(userName: string) {
        return ({
            queryText: `SELECT * FROM seller WHERE username= $1`,
            queryValues: [userName]
        })

    }

}