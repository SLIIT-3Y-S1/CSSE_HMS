import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, PrismaService],
})
export class AppointmentModule {}
