import { Equals, IsString } from "class-validator"

export class CreateBuyerDto {
    @IsString()
    username: string

    @IsString()
    password: string

    @Equals('buyer')
    user_type: string
}
