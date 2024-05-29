import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoPaymentModule } from './crypto-payment/crypto-payment.module';
import { FiatSettlementModule } from './fiat-settlement/fiat-settlement.module';
import { MerchantModule } from './merchant/merchant.module';
import { MobileModule } from './mobile/mobile.module';
import { Merchant } from './merchant/entity/merchant.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Merchant],
      synchronize: true,
    }),
    CryptoPaymentModule,
    FiatSettlementModule,
    MerchantModule,
    MobileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
