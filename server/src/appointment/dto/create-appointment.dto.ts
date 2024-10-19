import { AppointmentStatus } from '@prisma/client';
import { IsString, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  patientID: string;  // Patient

  @IsUUID()
  doctorID: string;   // Doctor

  @IsUUID()
  consultChartID: string; // ConsultChart

  @IsString()
  appointmentType: string;  // Type of appointment (e.g., consultation, follow-up)

  @IsOptional()
  status?: AppointmentStatus; // scheduled, completed, cancelled

  @IsBoolean()
  @IsOptional()
  refund?: boolean;  // Optional, defaults to false

  @IsBoolean()
  @IsOptional()
  reschedule?: boolean;  // Optional, defaults to false
}
