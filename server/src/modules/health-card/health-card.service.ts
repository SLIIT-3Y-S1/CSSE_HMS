import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../db/prisma/prisma.service';

@Injectable()
export class DigitalCardService {
    constructor(private readonly databaseService: PrismaService){}

    async create(createHealthcardDto: Prisma.PatientHealthCardCreateInput) {

        const healthCard = await this.databaseService.patientHealthCard.create({
            data: {
              ...createHealthcardDto,
                healthcardID: ' ',
            },
          });
      
          // Generate the unique code based on the patient ID
          const healthcardID = `${healthCard.patientID}-CARD`;
      
          // Update the patient record with the unique code
          return this.updateByPatientID(
            healthCard.patientID,
            { healthcardID: healthcardID }
          );
    }

    async findAll() {
        return this.databaseService.patientHealthCard.findMany();
    }

    async findOne(id: string) {
        return this.databaseService.patientHealthCard.findUnique({
        where: {
            healthcardID: id,
        }
        })
    }

    async update(id: string, updateHealthcardDto: Prisma.PatientHealthCardUpdateInput) {
        return this.databaseService.patientHealthCard.update({
        where: {
            healthcardID: id,
        },
        data: updateHealthcardDto,
        })
    }

    async remove(id: string) {
        return this.databaseService.patientHealthCard.delete({
        where: {
            healthcardID: id,
        }
        })
    }

    async updateByPatientID(id: string, updateHealthcardDto: Prisma.PatientHealthCardUpdateInput) {
        return this.databaseService.patientHealthCard.update({
        where: {
            patientID: id,
        },
        data: updateHealthcardDto,
        })
    }

    async findByPatientID(id: string) {
        return this.databaseService.patientHealthCard.findUnique({
        where: {
            patientID: id,
        }
        })
    }
}
