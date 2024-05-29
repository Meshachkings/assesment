import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FiatSettlementService {
  private readonly logger = new Logger(FiatSettlementService.name);
  private apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('FIAT_CONVERSION_API_KEY');
  }

  async convertToFiat(
    cryptoAmount: number,
    cryptoCurrency: string,
  ): Promise<number> {
    const url = 'https://api.fiat-conversion-service.com/convert';
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          url,
          {
            amount: cryptoAmount,
            currency: cryptoCurrency,
          },
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
            },
          },
        ),
      );
      return response.data.fiatAmount;
    } catch (error) {
      this.logger.error('Error converting crypto to fiat', error);
      throw new Error('Crypto to fiat conversion failed');
    }
  }
}
