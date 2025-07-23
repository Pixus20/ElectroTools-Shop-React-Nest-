import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RatingResolver } from './rating.resolver';
import { RatingService } from './rating.service';

@Module({
  imports: [PrismaModule],
  providers: [RatingResolver, RatingService],
})
export class RatingModule {}
