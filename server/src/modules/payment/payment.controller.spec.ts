import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { SaveTransactionDto } from './dtos/save_transaction.dto';
import { IPaymentService } from './services/payment.service.interface';
import { PaymentFactory } from './factory/payment.factory';

// Mocking the payment services for testing
const mockStripePaymentService = {
  createPaymentIntent: jest
    .fn()
    .mockResolvedValue({ client_secret: 'stripe_secret' }),
  saveTransaction: jest.fn().mockResolvedValue({
    transactionId: 'mock_transaction_id',
    paymentId: 'mock_payment_id',
    amount: 100,
    currency: 'usd',
    status: 'paid',
    paymentMethod: 'card',
    created_at: new Date(),
  }),
};

const mockPayPalPaymentService = {
  createPaymentIntent: jest
    .fn()
    .mockResolvedValue({ client_secret: 'paypal_secret' }),
  saveTransaction: jest.fn().mockResolvedValue({
    transactionId: 'mock_transaction_id',
    paymentId: 'mock_payment_id',
    amount: 100,
    currency: 'usd',
    status: 'paid',
    paymentMethod: 'card',
    created_at: new Date(),
  }),
};

const mockPaymentFactory = {
  createPaymentService: jest
    .fn()
    .mockImplementation((method: string): IPaymentService => {
      if (method === 'stripe') {
        return mockStripePaymentService;
      }
      if (method === 'paypal') {
        return mockPayPalPaymentService;
      }
      throw new Error('Unsupported payment method');
    }),
};

describe('PaymentController', () => {
  let paymentController: PaymentController;
  let paymentFactory: PaymentFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentFactory,
          useValue: mockPaymentFactory, // Use the mock factory
        },
      ],
    }).compile();

    paymentController = module.get<PaymentController>(PaymentController);
    paymentFactory = module.get<PaymentFactory>(PaymentFactory);
  });

  // Test case for createPaymentIntent
  describe('createPaymentIntent', () => {
    it('should create a payment intent and return client secret for Stripe', async () => {
      const createPaymentDto = {
        amount: 100,
        currency: 'usd',
        method: 'stripe',
      };

      const result =
        await paymentController.createPaymentIntent(createPaymentDto);

      expect(paymentFactory.createPaymentService).toHaveBeenCalledWith(
        'stripe',
      );
      expect(mockStripePaymentService.createPaymentIntent).toHaveBeenCalledWith(
        100,
        'usd',
      );
      expect(result).toEqual({ clientSecret: 'stripe_secret' });
    });

    it('should create a payment intent and return client secret for PayPal', async () => {
      const createPaymentDto = {
        amount: 100,
        currency: 'usd',
        method: 'paypal',
      };

      const result =
        await paymentController.createPaymentIntent(createPaymentDto);

      expect(paymentFactory.createPaymentService).toHaveBeenCalledWith(
        'paypal',
      );
      expect(mockPayPalPaymentService.createPaymentIntent).toHaveBeenCalledWith(
        100,
        'usd',
      );
      expect(result).toEqual({ clientSecret: 'paypal_secret' });
    });
  });

  // Test case for saveTransactions
  describe('saveTransactions', () => {
    it('should save a transaction and return transaction details for Stripe', async () => {
      const saveTransactionDto: SaveTransactionDto = {
        transactionId: 'mock_transaction_id',
        paymentId: 'mock_payment_id',
        amount: 100,
        currency: 'usd',
        status: 'paid',
        paymentMethod: 'stripe',
        created_at: new Date(),
      };

      const result =
        await paymentController.saveTransactions(saveTransactionDto);

      expect(paymentFactory.createPaymentService).toHaveBeenCalledWith(
        'stripe',
      );
      expect(mockStripePaymentService.saveTransaction).toHaveBeenCalledWith(
        saveTransactionDto,
      );
      expect(result).toEqual({
        transactionId: 'mock_transaction_id',
        paymentId: 'mock_payment_id',
        amount: 100,
        currency: 'usd',
        status: 'paid',
        paymentMethod: 'card',
        created_at: expect.any(Date),
      });
    });

    it('should save a transaction and return transaction details for PayPal', async () => {
      const saveTransactionDto: SaveTransactionDto = {
        transactionId: 'mock_transaction_id',
        paymentId: 'mock_payment_id',
        amount: 100,
        currency: 'usd',
        status: 'paid',
        paymentMethod: 'paypal',
        created_at: new Date(),
      };

      const result =
        await paymentController.saveTransactions(saveTransactionDto);

      expect(paymentFactory.createPaymentService).toHaveBeenCalledWith(
        'paypal',
      );
      expect(mockPayPalPaymentService.saveTransaction).toHaveBeenCalledWith(
        saveTransactionDto,
      );
      expect(result).toEqual({
        transactionId: 'mock_transaction_id',
        paymentId: 'mock_payment_id',
        amount: 100,
        currency: 'usd',
        status: 'paid',
        paymentMethod: 'card',
        created_at: expect.any(Date),
      });
    });
  });
});
