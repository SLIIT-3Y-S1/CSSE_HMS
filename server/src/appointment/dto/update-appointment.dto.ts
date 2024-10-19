import { IsString, IsDateString, IsOptional } from 'class-validator';



//only changable things in appointment [time,date,status]

export class UpdateAppointmentDto {
  @IsDateString()
  @IsOptional()
  appointmentDate?: string;  // Optional, only for rescheduling the date

  @IsString()
  @IsOptional()
  appointmentTime?: string;  // Optional, only for rescheduling the time

  @IsString()
  @IsOptional()
  status?: string;  // Optional, for changing the appointment status (e.g., scheduled, completed, cancelled)
}
