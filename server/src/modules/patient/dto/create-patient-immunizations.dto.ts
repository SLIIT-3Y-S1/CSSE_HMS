import { IsString, IsNotEmpty } from 'class-validator';

export class CreateImmunizationsDto {
  @IsString()
  @IsNotEmpty()
  patientID: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}