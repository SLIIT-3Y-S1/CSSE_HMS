import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../db/prisma/prisma.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class UserService {

  constructor(private readonly databaseService: PrismaService){}

  async create(createUserDto: Prisma.UserCreateInput) {
    const users = await this.databaseService.user.count();
    const userID = `USER-${users + 1}`;

    const user = await this.databaseService.user.create({
      data: {
        ...createUserDto,
        userID: userID,
      },
    });
    
    return user;
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.user.findUnique({
      where: {
        userID: id,
      }
    })
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
        userID: id,
      },
      data: updateUserDto,
    })
  }

  async remove(id: string) {
    return this.databaseService.user.delete({
      where: {
        userID: id,
      }
    })
  }
}
