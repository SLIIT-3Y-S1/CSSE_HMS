import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from '../db/prisma/prisma.service';


@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

   async create(createDoctorDto: CreateDoctorDto) {
    return this.prisma.doctor.create({
      data: createDoctorDto,
    });
  }
  
  findAll() {
    return `This action returns all doctor`;
  }

  async findOneByUserID(userID: string) {
    return this.prisma.doctor.findUnique({
      where: { userID },
    });
  }

  async update(userID: string, updateDoctorDto: UpdateDoctorDto) {
    return this.prisma.doctor.update({
      where: { userID },
      data: updateDoctorDto,
    });
  }


  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
