import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CryptoPaymentService } from './crypto-payment.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [CryptoPaymentService],
  exports: [CryptoPaymentService],
})
export class CryptoPaymentModule {}
