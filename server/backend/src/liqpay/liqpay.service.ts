import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class LiqpayService {
  private publicKey: string;
  private privateKey: string;

  constructor(private configService: ConfigService) {
   const publicKey = this.configService.get<string>('LIQPAY_PUBLIC_KEY');
   const privateKey = this.configService.get<string>('LIQPAY_PRIVATE_KEY');
 
   if (!publicKey || !privateKey) {
     throw new Error('LiqPay keys are not defined in environment variables');
   }
 
   this.publicKey = publicKey;
   this.privateKey = privateKey;
 }

  generatePayment(amount: number, orderId: string, description: string) {
    const payload = {
      public_key: this.publicKey,
      version: 3,
      action: 'pay',
      amount,
      currency: 'UAH',
      description,
      order_id: orderId,
      result_url: 'https://your-frontend.com/thanks',
      server_url: 'https://your-backend.com/api/liqpay/callback',
    };

    const data = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = crypto
      .createHash('sha1')
      .update(this.privateKey + data + this.privateKey)
      .digest('base64');

    return { data, signature };
  }
}
