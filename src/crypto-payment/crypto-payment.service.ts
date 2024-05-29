import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CryptoPaymentService {
  private readonly logger = new Logger(CryptoPaymentService.name);
  private apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('CRYPTO_PAYMENT_API_KEY');
  }

  async initiatePayment(
    amount: number,
    currency: string,
    merchantId: string,
  ): Promise<any> {
    const url = 'https://api.crypto-payment-gateway.com/payment';
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          url,
          {
            amount,
            currency,
            merchantId,
          },
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error initiating payment', error);
      throw new Error('Payment initiation failed');
    }
  }

  async confirmPayment(paymentId: string): Promise<any> {
    const url = `https://api.crypto-payment-gateway.com/payment/${paymentId}/confirm`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error confirming payment', error);
      throw new Error('Payment confirmation failed');
    }
  }
}
