import { PartialType } from '@nestjs/mapped-types';
import { InputCreateBidDto, OutputCreateBidDto } from './create-bid.dto';

export class InputUpdateBidDto extends PartialType(InputCreateBidDto) { }
export class OutputUpdateBidDto extends PartialType(OutputCreateBidDto) { }
