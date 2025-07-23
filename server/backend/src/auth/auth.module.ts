import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],  
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),  
        signOptions: { expiresIn: '7d' },  
      }),
    }),
  ],
  providers: [JwtStrategy, AuthResolver, AuthService],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
