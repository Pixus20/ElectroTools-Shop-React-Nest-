import { Module } from '@nestjs/common';
import { LiqpayResolver } from './liqpay.resolver';
import { LiqpayService } from './liqpay.service';

@Module({
  providers: [LiqpayService, LiqpayResolver],
})
export class LiqpayModule {}
