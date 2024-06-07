import { PartialType } from '@nestjs/mapped-types';
import { InputCreateOfferDto, OutputCreateOfferDto } from './create-offer.dto';

export class InputUpdateOfferDto extends PartialType(InputCreateOfferDto) { }
export class OutputUpdateOfferDto extends PartialType(OutputCreateOfferDto) { }
