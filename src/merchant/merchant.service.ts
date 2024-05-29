import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from './entity/merchant.entity';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private merchantsRepository: Repository<Merchant>,
  ) {}

  create(merchant: Merchant): Promise<Merchant> {
    return this.merchantsRepository.save(merchant);
  }

  findAll(): Promise<Merchant[]> {
    return this.merchantsRepository.find();
  }

  findOne(id: any): Promise<Merchant> {
    return this.merchantsRepository.findOne(id);
  }

  async updateBalance(id: any, amount: number): Promise<void> {
    const merchant = await this.merchantsRepository.findOne(id);
    merchant.accountBalance += amount;
    await this.merchantsRepository.save(merchant);
  }
}
