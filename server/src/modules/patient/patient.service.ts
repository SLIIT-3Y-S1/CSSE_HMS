import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { log } from 'console';
import { PrismaService } from '../db/prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private readonly databaseService: PrismaService){}

  async create(createPatientDto: Prisma.PatientCreateInput) {
    log(createPatientDto);
    const patientCount = await this.databaseService.patient.count();
    const patientID = `PAT-${patientCount+1}`;

    const patient = await this.databaseService.patient.create({
        data: {
            ...createPatientDto,
            patientID: patientID,
            uniqueCode: ' ', 
        },
    });

    // Generate the unique code based on the patient ID
    const uniqueCode = `UQ-${patient.patientID}`;
    
    // Update the patient record with the unique code
    return this.databaseService.patient.update({
        where: { patientID: patient.patientID },
        data: {
            uniqueCode: uniqueCode,
            // userID: userID,
        },
    });
  }

  async findAll() {
    return this.databaseService.patient.findMany();
  }

  findOne(id: string) {
    return this.databaseService.patient.findUnique({
      where: {
        patientID: id,
      }
    })
  }

  async update(id: string, updatePatientDto: Prisma.PatientUpdateInput) {
    return this.databaseService.patient.update({
      where: {
        patientID: id,
      },
      data: updatePatientDto,
    })
  }

  async remove(id: string) {
    return this.databaseService.patient.delete({
      where: {
        patientID: id,
      }
    })
  }

  getPatientByUserID(id: string) {
    return this.databaseService.patient.findUnique({
      where: {
        userID: id,
      }
    })
  }

}
