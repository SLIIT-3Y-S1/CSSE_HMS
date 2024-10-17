import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DigitalCardService } from './health-card.service';
import { Prisma } from '@prisma/client';

@Controller('digital-card')
export class DigitalCardController {
  constructor(private readonly digitalCardService: DigitalCardService) {}

  @Post()
  create(@Body() createHealthcardDto: Prisma.PatientHealthCardCreateInput) {
    return this.digitalCardService.create(createHealthcardDto);
  }

  @Get()
  findAll() {
    return this.digitalCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.digitalCardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthcardDto: Prisma.PatientHealthCardUpdateInput) {
    return this.digitalCardService.update(id, updateHealthcardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.digitalCardService.remove(id);
  }

  @Get('get-status-by-patientID/:id')
  findByPatientID(@Param('id') id: string) {
    return this.digitalCardService.findByPatientID(id);
  }

}
