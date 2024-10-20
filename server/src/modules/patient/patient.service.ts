import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { log } from 'console';
import { PrismaService } from '../db/prisma/prisma.service';
import { UpdatePatientAllergyDto } from './dto/update-patient-allergy.dto';
import { CreateAllergyDto } from './dto/create-patient-allergy.dto';
import { CreateImmunizationsDto } from './dto/create-patient-immunizations.dto';
import { UpdateImmunizationsDto } from './dto/update-patient-immunizations.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';

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

  async getAllPatients() {
    return await this.databaseService.patient.findMany({
      include: {
        User: true, // Assuming User is related to Patient via `userID`
      },
    });
  }


  async findOne(id: string) {
    return await this.databaseService.patient.findUnique({
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


  /* -----------Services for patient allergies-------------- */

  async createAllergy(createAllergyDto: CreateAllergyDto) {
    return this.databaseService.allergies.create({
      data: createAllergyDto,
    });
  }

  async getAllergiesByPatientID(patientID: string) {
    return this.databaseService.allergies.findMany({
      where: { patientID },
    });
  }

  async deleteAllergy(id: number) {
    return this.databaseService.allergies.delete({
      where: { id: Number(id) }, // Ensure id is an integer
    });
  }

  async updateAllergy(id: number, UpdatePatientAllergyDto: UpdatePatientAllergyDto) {
    return this.databaseService.allergies.update({
      where: { id: Number(id) },
      data: UpdatePatientAllergyDto,
    });
  }

  /* -----------Services for patient immunizations-------------- */

  async createImmunization(createImmunizationDto: CreateImmunizationsDto) {
    return this.databaseService.immunizations.create({
      data: createImmunizationDto,
    });
  }

  async getImmunizationsByPatientID(patientID: string) {
    return this.databaseService.immunizations.findMany({
      where: { patientID },
    });
  }

  async deleteImmunization(id: number) {
    return this.databaseService.immunizations.delete({
      where: { id: Number(id) }, // Ensure id is an integer
    });
  }

  async updateImmunization(id: number, updateImmunizationDto: UpdateImmunizationsDto) {
    return this.databaseService.immunizations.update({
      where: { id: Number(id) },
      data: updateImmunizationDto,
    });
  }

  /* -----------Services for patient medical records-------------- */
  async createMedicalRecord(createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.databaseService.patientMedicalRecord.create({
      data: createMedicalRecordDto,
    });
  }

  async getMedicalRecordsByPatientID(patientID: string) {
    return this.databaseService.patientMedicalRecord.findMany({
      where: { patientID },
      include: {
        Doctor: true, // Include the related doctor information
      },
    });
  }

  async getMedicalRecordByID(recordID: string) {
    return this.databaseService.patientMedicalRecord.findUnique({
      where: { recordID },
      include: {
        Doctor: true, // Include the related doctor information
      },
    });
  }

  async updateMedicalRecord(recordID: string, updateData:{ diagnosis?: string, treatmentPlan?: string }) {
    return this.databaseService.patientMedicalRecord.update({
      where: { recordID },
      data: updateData,
    });
  }
}
