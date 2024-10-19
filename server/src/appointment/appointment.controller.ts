import { Controller, Post, Body, Get,Param,Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments') // Define the base route for appointments
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  

  // Endpoint to get all doctors
  @Get('doctors')
  async getAllDoctors() {
    return this.appointmentService.getAllDoctors();
  }

 // Endpoint to get all consult charts except not available ones by doctor ID
 @Get('consult-charts/:doctorID')
 async getAllConsultCharts(@Param('doctorID') doctorID: string) {
   return this.appointmentService.getAllConsultCharts(doctorID);
 }


  //get appoitments by id
  @Get('patient/:patientID')
  async getAppointmentsByPatientID(@Param('patientID') patientID: string) {
    return this.appointmentService.getAppointmentsByPatientID(patientID);
  }

   // Endpoint to create a new appointment
   @Post()
   async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
     return this.appointmentService.createAppointment(createAppointmentDto);
   }

   //delete appointment
   @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    return this.appointmentService.deleteAppointment(id);
  }

  /* New endpoint to get appointments by patientID
  @Get('patient/:patientID')
  async getAppointmentsByPatientID(@Param('patientID') patientID: string) {
    return this.appointmentService.getAppointmentsByPatientID(patientID);
  }*/
}
