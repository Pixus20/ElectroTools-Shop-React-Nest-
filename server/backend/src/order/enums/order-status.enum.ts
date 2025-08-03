import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Статус замовлення',
});