import { Controller } from '@nestjs/common';
import { DigitalCardService } from './digital-card.service';

@Controller('digital-card')
export class DigitalCardController {
  constructor(private readonly digitalCardService: DigitalCardService) {}
}
