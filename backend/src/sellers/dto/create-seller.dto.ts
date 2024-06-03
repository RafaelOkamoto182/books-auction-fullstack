import { Equals, IsString } from "class-validator"


export class CreateSellerDto {
    @IsString()
    username: string

    @IsString()
    password: string

    @Equals('seller')
    user_type: string
}
