import { Module } from '@nestjs/common';
import { DigitalCardService } from './digital-card.service';
import { DigitalCardController } from './digital-card.controller';

@Module({
  controllers: [DigitalCardController],
  providers: [DigitalCardService],
})
export class DigitalCardModule {}
