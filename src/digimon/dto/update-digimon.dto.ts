import { PartialType } from '@nestjs/mapped-types';
import { CreateDigimonDto } from './create-digimon.dto';

export class UpdateDigimonDto extends PartialType(CreateDigimonDto) {}
