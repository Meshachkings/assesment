import { Test, TestingModule } from '@nestjs/testing';
import { CryptoPaymentController } from './crypto-payment.controller';
import { CryptoPaymentService } from './crypto-payment.service';

describe('CryptoPaymentController', () => {
  let controller: CryptoPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoPaymentController],
      providers: [CryptoPaymentService],
    }).compile();

    controller = module.get<CryptoPaymentController>(CryptoPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
