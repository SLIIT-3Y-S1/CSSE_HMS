import { Module } from '@nestjs/common';
import { DigitalCardService } from './health-card.service';
import { DigitalCardController } from './health-card.controller';
import { PrismaModule } from '../db/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DigitalCardController],
  providers: [DigitalCardService],
})
export class DigitalCardModule {}
