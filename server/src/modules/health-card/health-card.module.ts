import { Module } from '@nestjs/common';
import { HealthCardService } from './health-card.service';
import { HealthCardController } from './health-card.controller';

@Module({
  controllers: [HealthCardController],
  providers: [HealthCardService],
})
export class HealthCardModule {}
