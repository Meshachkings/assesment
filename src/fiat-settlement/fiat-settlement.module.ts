import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { FiatSettlementService } from './fiat-settlement.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [FiatSettlementService],
  exports: [FiatSettlementService],
})
export class FiatSettlementModule {}
