import { Injectable } from '@nestjs/common';
import { Role } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: {
    email: string;
    password: string;
    firstName: string;
    secondName: string;
    nicname?: string;
    avatarURL?: string;
    birthDay: Date;
    sex: string;
    role?: Role;
  }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        secondName: data.secondName,
        nicname: data.nicname ?? '',
        avatarURL: data.avatarURL ?? '',
        birthDay: data.birthDay,
        sex: data.sex,
        role: data.role ?? Role.USER,
      },
    });
  }


  async findAll() {
    return this.prisma.user.findMany();
  }

  async update(id: number, data: Partial<{
    firstName: string;
    secondName: string;
    nicname: string;
    avatarURL: string;
    birthDay: Date;
    sex: string;
  }>) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

}
