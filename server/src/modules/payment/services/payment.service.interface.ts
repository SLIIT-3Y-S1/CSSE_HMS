import { SaveTransactionDto } from '../dtos/save_transaction.dto';

// payment.service.interface.ts
export interface IPaymentService {
  createPaymentIntent(amount: number, currency: string): Promise<any>;
  saveTransaction(saveTransactionDto: SaveTransactionDto): Promise<any>;
}
