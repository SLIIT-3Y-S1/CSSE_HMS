import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthCardDto } from './create-health-card.dto';

export class UpdateHealthCardDto extends PartialType(CreateHealthCardDto) {}
