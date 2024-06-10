import { IsEnum } from "class-validator";
import { TokenPayloadDto } from "src/utils/general-dto/token-payload.dto";
import { SearchCategory } from "../enums/search-category";

export class InputGetOfferDto extends TokenPayloadDto {


}
export class OutputGetOfferDto extends TokenPayloadDto {
    page: number
    search_text: string
    @IsEnum(SearchCategory)
    search_by: SearchCategory
}