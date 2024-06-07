import { IsDecimal, IsUUID } from "class-validator"

export class InputCreateBidDto {

    @IsUUID()
    offer_id: string

    @IsDecimal({ decimal_digits: '2,2' },
        { message: 'bid_amount must be a decimal number with exactly 2 digits after the decimal point' })
    bid_amount: string
}
export class OutputCreateBidDto {

    @IsUUID()
    offer_id: string

    @IsUUID()
    buyer_id: string

    @IsDecimal({ decimal_digits: '2,2' },
        { message: 'bid_amount must be a decimal number with exactly 2 digits after the decimal point' })
    bid_amount: string
}
