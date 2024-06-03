import { CreateBuyerDto } from "./dto/create-buyer.dto";

export const buyersQuery = {
    create(parameters: CreateBuyerDto) {
        return ({
            queryText: `INSERT INTO public.buyer (buyer_id, username, password,user_type)
            VALUES (gen_random_uuid(), $1, $2, $3)`,
            queryValues: [parameters.username, parameters.password, parameters.user_type]
        })
    },

    selectById(id: string) {
        return ({
            queryText: `SELECT * FROM buyer WHERE buyer_id = $1`,
            queryValues: [id]
        })
    },

    selectByUserName(userName: string) {
        return ({
            queryText: `SELECT * FROM buyer WHERE username= $1`,
            queryValues: [userName]
        })

    }


}