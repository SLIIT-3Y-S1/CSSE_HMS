import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import { SaveTransactionDto } from './dtos/save_transaction.dto';
import { PrismaService } from '../db/prisma/prisma.service';
import { IPaymentService } from './services/payment.service.interface';

@Injectable()
export class StripePaymentService implements IPaymentService {
  private stripe: Stripe;

  // Inject PrismaService via the constructor
  constructor(private readonly prismaService: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-09-30.acacia',
    });
  }

  async createPaymentIntent(amount: number, currency: string) {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }

  async saveTransaction(saveTransactionDto: SaveTransactionDto) {
    const currency =
      saveTransactionDto.currency === undefined
        ? 'usd'
        : saveTransactionDto.currency; // Set default value if currency is not provided
    const _transaction = await this.prismaService.transaction.create({
      data: {
        currency,
        ...saveTransactionDto, // Spread the values from the DTO
        transactionId: uuidv4(),
        created_at: new Date(),
      },
    });
    return _transaction;
  }
}
