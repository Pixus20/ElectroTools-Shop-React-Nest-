import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { UsersService } from './user.service';

@Module({
  providers: [UserResolver, UsersService, PrismaService],
})
export class UserModule {}