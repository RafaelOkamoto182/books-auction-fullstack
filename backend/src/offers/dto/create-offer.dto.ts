import { IsDecimal, IsOptional, IsString, IsUUID } from "class-validator"

export class InputCreateOfferDto {

    @IsString()
    book_name: string

    @IsString()
    book_author: string

    @IsString()
    book_genre: string

    @IsOptional()
    @IsDecimal({ decimal_digits: '2,2' },
        { message: 'desirable_price must be a decimal number with exactly 2 digits after the decimal point' })
    desirable_price: string
}
export class OutputCreateOfferDto {

    @IsUUID()
    seller_id: string

    @IsString()
    book_name: string

    @IsString()
    book_author: string

    @IsString()
    book_genre: string

    @IsOptional()
    @IsDecimal({ decimal_digits: '2,2' },
        { message: 'desirable_price must be a decimal number with exactly 2 digits after the decimal point' })
    desirable_price: string
}
