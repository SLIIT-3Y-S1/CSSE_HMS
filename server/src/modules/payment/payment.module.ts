import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentFactory } from './factory/payment.factory';
import { StripePaymentService } from './payment.service';
import { PrismaService } from '../db/prisma/prisma.service';


@Module({
  controllers: [PaymentController],
  providers: [
    PaymentFactory,
    StripePaymentService,
    PrismaService
    // PayPalPaymentService,
    // Add PrismaService if needed
  ],
})
export class PaymentModule {}
