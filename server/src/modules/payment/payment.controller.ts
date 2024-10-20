import { Body, Controller, Post } from '@nestjs/common';
import { SaveTransactionDto } from './dtos/save_transaction.dto';
import { PaymentFactory } from './factory/payment.factory';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentFactory: PaymentFactory) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() createPaymentDto: { amount: number, currency: string, method: string }) {
    console.log(createPaymentDto);
    const paymentService = this.paymentFactory.createPaymentService(createPaymentDto.method);
    const paymentIntent = await paymentService.createPaymentIntent(createPaymentDto.amount, createPaymentDto.currency);
    return { clientSecret: paymentIntent.client_secret };
  }

  @Post('save-transaction')
  async saveTransactions(@Body() saveTransactionDto: SaveTransactionDto) {
    console.log(saveTransactionDto);
    const paymentService = this.paymentFactory.createPaymentService(saveTransactionDto.paymentMethod); // Assuming paymentMethod contains the method to use
    return await paymentService.saveTransaction(saveTransactionDto);
  }
}
