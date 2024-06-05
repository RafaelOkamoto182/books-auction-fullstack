import { IsIn, IsNotEmpty, IsString } from "class-validator"

export class SignInDto {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsIn(['buyer', 'seller'])
    user_type: string
}
