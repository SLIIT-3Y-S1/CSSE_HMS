import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import * as QRCode from 'qrcode';


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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
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
}
