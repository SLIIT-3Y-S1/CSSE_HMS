import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const { patientID, doctorID, consultChartID, appointmentType, status, refund, reschedule } = createAppointmentDto;
  
    // Create the new appointment
    const newAppointment = await this.prisma.appointment.create({
      data: {
        patientID,
        doctorID,
        consultChartID,
        appointmentType,
        status: status || 'scheduled',
        refund: refund || false,
        reschedule: reschedule || false,
      },
    });
  
    await this.prisma.consultChart.update({
      where: { consultChartID },
      data: { available: false }, // Set available to false
    });
  
    return newAppointment;
  }


  //delete appointment
  async deleteAppointment(appointmentID: string) {
    const appointment = await this.prisma.appointment.delete({
      where: { appointmentID },
    });
  
    return appointment;
  }
  

  async getAllDoctors() {
    return this.prisma.doctor.findMany({
      select: {
        doctorID: true,
        firstname: true,
        lastname: true,
        specialization: true,
      },
    });
  }

  async getAllConsultCharts(doctorID: string) {
    return this.prisma.consultChart.findMany({
      where: {
        available: true, 
        doctorID: doctorID, // Match the provided doctorID
      },
      select: {
        consultChartID: true,
        doctorID: true,
        consultDate: true,
        consultTime: true,
        Hospital: { 
          select: {
            hospitalName: true,
            hospitalFee:true,
          },
        },
      },
    });
  }

  // New method to retrieve appointments by patientID
  async getAppointmentsByPatientID(patientID: string) {
    return this.prisma.appointment.findMany({
      where: { patientID },
      select: {
        appointmentID: true,
        appointmentType: true,
        reschedule:true,
        status: true,
        Doctor: {
          select: {
            firstname: true,
            lastname: true,
            specialization: true,
          },
        },
        ConsultChart: {
          select: {
            consultDate: true,
            consultTime: true,
            Hospital: {
              select: {
                hospitalName: true,
                hospitalFee: true,
              },
            },
          },
        },
      },
    });
  }
  
}
