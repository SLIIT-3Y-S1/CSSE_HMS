// payment.factory.ts
import { Injectable } from '@nestjs/common';
import { IPaymentService } from '../services/payment.service.interface';
import { StripePaymentService } from '../payment.service';
import { PrismaService } from '../../db/prisma/prisma.service';

@Injectable()
export class PaymentFactory {
  createPaymentService(method: string): IPaymentService {
    switch (method) {
      case 'stripe':
        return new StripePaymentService(new PrismaService());
      case 'paypal':
      // return new PayPalPaymentService();
      default:
        throw new Error('Unsupported payment method');
    }
  }
}
