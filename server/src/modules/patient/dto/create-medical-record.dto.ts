import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsString()
  @IsNotEmpty()
  patientID: string;

  @IsString()
  @IsNotEmpty()
  doctorID: string;
}