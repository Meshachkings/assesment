import { Controller } from '@nestjs/common';
import { CryptoPaymentService } from './crypto-payment.service';

@Controller('crypto-payment')
export class CryptoPaymentController {
  constructor(private readonly cryptoPaymentService: CryptoPaymentService) {}
}
