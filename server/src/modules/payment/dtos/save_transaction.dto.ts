import { v4 as uuidv4 } from 'uuid';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class SaveTransactionDto {
  transactionId: string;
  
  @IsNotEmpty()
  paymentId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  currency: string = 'usd'; // Default value

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  created_at: Date;

}
