import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MerchantService } from '../merchant/merchant.service';
import { FiatSettlementService } from '../fiat-settlement/fiat-settlement.service';
import { CryptoPaymentService } from '../crypto-payment/crypto-payment.service';

@Controller('mobile')
export class MobileController {
  constructor(
    private readonly merchantService: MerchantService,
    private readonly fiatSettlementService: FiatSettlementService,
    private readonly cryptoPaymentService: CryptoPaymentService,
  ) {}

  @Get('exchange-rates')
  async getExchangeRates() {
    // Mocked response, implement real logic to fetch exchange rates
    return { BTC: 50000, ETH: 3000 };
  }

  @Post('payment-confirmation/:merchantId')
  async confirmPayment(
    @Param('merchantId') merchantId: string,
    @Body() paymentDetails: any,
  ) {
    const { paymentId, cryptoAmount, cryptoCurrency } = paymentDetails;

    await this.cryptoPaymentService.confirmPayment(paymentId);
    const fiatAmount = await this.fiatSettlementService.convertToFiat(
      cryptoAmount,
      cryptoCurrency,
    );
    await this.merchantService.updateBalance(parseInt(merchantId), fiatAmount);
    return { success: true, fiatAmount };
  }
}
