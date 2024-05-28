import { IsEnum, IsString } from "class-validator"
import { UserType } from "../entities/user.entity"


export class CreateUserDto {
    @IsString()
    username: string

    @IsString()
    password: string

    @IsEnum(UserType)
    user_type: UserType

}
