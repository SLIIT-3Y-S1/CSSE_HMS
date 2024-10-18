import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../db/prisma/prisma.service';

@Injectable()
export class PatientService {
 
  constructor(private readonly prisma: PrismaService) {}

  create(createPatientDto: CreatePatientDto) {
    return 'This action adds a new patient';
  }

  async getAllPatients() {
    return await this.prisma.patient.findMany({
      include: {
        User: true, // Assuming User is related to Patient via `userID`
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
