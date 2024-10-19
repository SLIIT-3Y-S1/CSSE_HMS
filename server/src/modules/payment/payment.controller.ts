import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Post()
  // @Post('create-payment-intent')
  // async createPaymentIntent(@Body() createPaymentDto: { amount: number, currency: string }) {
  //   const paymentIntent = await this.paymentService.createPaymentIntent(createPaymentDto.amount, createPaymentDto.currency);
  //  return { clientSecret: paymentIntent.client_secret };
  // }
}
