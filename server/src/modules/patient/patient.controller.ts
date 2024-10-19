import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import * as QRCode from 'qrcode';
import { CreateAllergyDto } from './dto/create-patient-allergy.dto';
import { UpdatePatientAllergyDto } from './dto/update-patient-allergy.dto';
import { CreateImmunizationsDto } from './dto/create-patient-immunizations.dto';
import { UpdateImmunizationsDto } from './dto/update-patient-immunizations.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';


@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: Prisma.PatientCreateInput) {
    return this.patientService.create(createPatientDto);
  }

  @Get('all')
  async findAll() {
    const patients = await this.patientService.getAllPatients();
    return patients;
  }

  @Get('getbyPatientID/:id')
  async findOne(@Param('id') id: string) {
    try{
      return await this.patientService.findOne(id);
    }
    catch(e){
      return {message: e.message};
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: Prisma.PatientUpdateInput) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }

  @Get('get-patient-by-userID/:id')
  getPatientByUserID(@Param('id') id: string) {
    return this.patientService.getPatientByUserID(id);
  }

  @Get('get-unique-code/:id')
  async getUniqueCode(@Param('id') userId: string) {
    const patient = await this.patientService.findOne(userId);
    if (!patient) {
      return { message: 'Patient not found' };
    }
    return { uniqueCode: patient.uniqueCode };
  }

  @Get('get-qrcode/:id')
  async generateQRCode(@Param('id') userId: string, @Res() res: Response) {
    const uniqueCodeResponse = await this.getUniqueCode(userId);
    
    if (!uniqueCodeResponse.uniqueCode) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    
    const qrCode = await QRCode.toDataURL(uniqueCodeResponse.uniqueCode);
    
    // Convert the data URL to a buffer
    const buffer = Buffer.from(qrCode.split(",")[1], 'base64');
    
    // Set the response headers to indicate a file attachment
    res.setHeader('Content-Disposition', 'attachment; filename="qrcode.png"');
    res.setHeader('Content-Type', 'image/png');
    
    // Send the buffer as the response
    res.send(buffer);
  }

  /* -------Controllers for Patient Allergies----------  */

  @Post('createAllergy')
  createAllergy(@Body() createAllergyDto: CreateAllergyDto) {
    return this.patientService.createAllergy(createAllergyDto);
  }

  @Get('getAllergy/:patientID')
  getAllergiesByPatientID(@Param('patientID') patientID: string) {
    return this.patientService.getAllergiesByPatientID(patientID);
  }

  @Delete('deleteAllergy/:id')
  deleteAllergy(@Param('id') id: string) {
    return this.patientService.deleteAllergy(Number(id)); // Ensure id is an integer
  }

  @Put('updateAllergy/:id')
  updateAllergy(@Param('id') id: number, @Body() UpdatePatientAllergyDto: UpdatePatientAllergyDto) {
    return this.patientService.updateAllergy(Number(id), UpdatePatientAllergyDto);
  }


  /* -------Controllers for Patient Immunizations----------  */

  @Post('createImmunization')
  createImmunization(@Body() createImmunizationDto: CreateImmunizationsDto) {
    return this.patientService.createImmunization(createImmunizationDto);
  }

  @Get('getImmunization/:patientID')
  getImmunizationsByPatientID(@Param('patientID') patientID: string) {
    return this.patientService.getImmunizationsByPatientID(patientID);
  }

  @Delete('deleteImmunization/:id')
  deleteImmunization(@Param('id') id: string) {
    return this.patientService.deleteImmunization(Number(id)); // Ensure id is an integer
  }

  @Put('updateImmunization/:id')
  updateImmunization(@Param('id') id: number, @Body() updateImmunizationDto: UpdateImmunizationsDto) {
    return this.patientService.updateImmunization(Number(id), updateImmunizationDto);
  }

  /* -------Controllers for Patient Medications----------  */

  @Post('createMedicalRecords')
  createMedicalRecord(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.patientService.createMedicalRecord(createMedicalRecordDto);
  }

  @Get('getMedicalRecordsByPatientID/:patientID')
  getMedicalRecordsByPatientID(@Param('patientID') patientID: string) {
    return this.patientService.getMedicalRecordsByPatientID(patientID);
  }

}
