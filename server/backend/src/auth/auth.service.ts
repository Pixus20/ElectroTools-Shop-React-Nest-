import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UserModel } from '../user/models/user.model';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService, 
  ) {}

  async register(input: RegisterInput): Promise<UserModel> {
    const { email, password, firstName, secondName } = input;

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        secondName,
        nicname: input.nicname,
        createdAt: new Date(),
        avatarURL: '',
        birthDay: new Date(),
        sex: '',
        role: 'USER',
      },
    });

    return newUser;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
