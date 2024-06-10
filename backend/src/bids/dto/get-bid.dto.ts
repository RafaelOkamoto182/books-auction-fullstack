import { TokenPayloadDto } from "src/utils/general-dto/token-payload.dto"

export class inputGetBidDto extends TokenPayloadDto { }

export class outputGetBidDto extends TokenPayloadDto {
    page: number
}