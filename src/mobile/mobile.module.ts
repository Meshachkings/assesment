import { Module } from '@nestjs/common';
import { MobileController } from './mobile.controller';
import { MerchantModule } from '../merchant/merchant.module';
import { FiatSettlementModule } from '../fiat-settlement/fiat-settlement.module';
import { CryptoPaymentModule } from '../crypto-payment/crypto-payment.module';

@Module({
  imports: [MerchantModule, FiatSettlementModule, CryptoPaymentModule],
  controllers: [MobileController],
})
export class MobileModule {}
