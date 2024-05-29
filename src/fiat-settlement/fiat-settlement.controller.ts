import { Controller } from '@nestjs/common';
import { FiatSettlementService } from './fiat-settlement.service';

@Controller('fiat-settlement')
export class FiatSettlementController {
  constructor(private readonly fiatSettlementService: FiatSettlementService) {}
}
