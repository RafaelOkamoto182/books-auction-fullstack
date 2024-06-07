import { IsNumber, IsString } from "class-validator"


export class TokenPayloadDto {
    @IsString()
    sub: string

    @IsString()
    role: string

    @IsNumber()
    iat: string

    @IsNumber()
    exp: number
}
